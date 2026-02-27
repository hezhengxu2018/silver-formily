import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { FormDialog, FormItem, Input } from '../../'
import 'element-plus/theme-chalk/index.css'

const { SchemaField, SchemaStringField } = createSchemaField({ components: { Input, FormItem } })

describe('formDialog', () => {
  afterEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  describe('基础功能', () => {
    it('应该支持打开和关闭对话框', async () => {
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <div data-testid="dialog-content">对话框内容</div>
          )).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { getByText, getByRole } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })
      await getByText('打开对话框').click()
      await expect.element(getByText('测试标题')).toBeInTheDocument()
      await expect.element(getByText('取消')).toBeInTheDocument()
      await getByText('取消').click()
      expect(document.querySelector('.el-dialog__wrapper')).toBeNull()
      await getByText('打开对话框').click()
      await expect.element(getByRole('button', { name: '确定' })).toBeInTheDocument()
      await getByRole('button', { name: '确定' }).click()
      await getByText('打开对话框').click()
      await expect.element(getByRole('button', { name: 'Close this dialog' })).toBeInTheDocument()
      await getByRole('button', { name: 'Close this dialog' }).click()
      expect(document.querySelector('.el-dialog__wrapper')).toBeNull()
    })

    it('应该支持渲染组件', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
        },
      })
      const DialogForm = {
        data() {
          const schema = {
            type: 'object',
            properties: {
              aaa: {
                'type': 'string',
                'title': '输入框1',
                'required': true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              bbb: {
                'type': 'string',
                'title': '输入框2',
                'required': true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              ccc: {
                'type': 'string',
                'title': '输入框3',
                'required': true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              ddd: {
                'type': 'string',
                'title': '输入框4',
                'required': true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          }
          return {
            schema,
          }
        },
        render() {
          return (<SchemaField schema={this.schema} />)
        },
      }
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', DialogForm).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开抽屉</ElButton>
      }

      const { getByText } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })
      await getByText('打开抽屉').click()
      await expect.element(getByText('输入框4')).toBeInTheDocument()
      await getByText('取消').click()
      expect(document.querySelector('.el-drawer__wrapper')).toBeNull()
    })
  })

  it('应该在输入框回车时提交当前对话框', async () => {
    const confirmSpy = vi.fn()

    const TestComponent = () => {
      const handleOpen = () => {
        FormDialog('测试标题', () => (
          <SchemaField>
            <SchemaStringField
              name="input"
              title="输入框"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField>
        ))
          .forConfirm((form, next) => {
            confirmSpy(form.values)
            next()
          })
          .open()
          .catch(console.error)
      }

      return <ElButton onClick={handleOpen}>打开回车对话框</ElButton>
    }

    const { getByText } = render(() => <TestComponent />, {
      global: {
        stubs: {
          Transition: false,
        },
      },
    })

    await getByText('打开回车对话框').click()
    const input = document.querySelector('input') as HTMLInputElement
    input.focus()
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    await vi.waitFor(() => expect(confirmSpy).toHaveBeenCalledTimes(1))
  })

  it('应该只让最近打开的对话框响应回车', async () => {
    const firstConfirm = vi.fn()
    const secondConfirm = vi.fn()

    const TestComponent = () => {
      const openSecondDialog = () => {
        FormDialog('二级对话框', () => (
          <SchemaField>
            <SchemaStringField
              name="second-input"
              title="输入框2"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField>
        ))
          .forConfirm((form, next) => {
            secondConfirm(form.values)
            next()
          })
          .open()
          .catch(console.error)
      }

      const handleOpen = () => {
        FormDialog('一级对话框', () => (
          <div>
            <SchemaField>
              <SchemaStringField
                name="first-input"
                title="输入框1"
                x-decorator="FormItem"
                x-component="Input"
              />
            </SchemaField>
            <ElButton class="open-second" onClick={openSecondDialog}>打开二级对话框</ElButton>
          </div>
        ))
          .forConfirm((form, next) => {
            firstConfirm(form.values)
            next()
          })
          .open()
          .catch(console.error)
      }

      return <ElButton onClick={handleOpen}>打开一级对话框</ElButton>
    }

    const { getByText } = render(() => <TestComponent />, {
      global: {
        stubs: {
          Transition: false,
        },
      },
    })

    await getByText('打开一级对话框').click()
    await getByText('打开二级对话框').click()

    await vi.waitFor(() => expect(document.querySelectorAll('input').length).toBeGreaterThanOrEqual(2))
    const inputs = Array.from(document.querySelectorAll('input')) as HTMLInputElement[]
    const topInput = inputs.at(-1)
    topInput.focus()
    topInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    await vi.waitFor(() => expect(secondConfirm).toHaveBeenCalledTimes(1))
    expect(firstConfirm).not.toHaveBeenCalled()
  })

  it('应该支持关闭回车提交配置', async () => {
    const confirmSpy = vi.fn()

    const TestComponent = () => {
      const handleOpen = () => {
        FormDialog({ title: '测试标题', enterSubmit: false }, () => (
          <SchemaField>
            <SchemaStringField
              name="input"
              title="输入框"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField>
        ))
          .forConfirm((form, next) => {
            confirmSpy(form.values)
            next()
          })
          .open()
          .catch(console.error)
      }

      return <ElButton onClick={handleOpen}>打开禁用回车对话框</ElButton>
    }

    const { getByText } = render(() => <TestComponent />, {
      global: {
        stubs: {
          Transition: false,
        },
      },
    })

    await getByText('打开禁用回车对话框').click()
    const input = document.querySelector('input') as HTMLInputElement
    input.focus()
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    await new Promise(resolve => setTimeout(resolve, 50))
    expect(confirmSpy).not.toHaveBeenCalled()
  })

  describe('中间件功能', () => {
    it('应该支持forOpen中间件', async () => {
      const openMiddleware = vi.fn((props, next) => next({ initialValues: { input: 'test' } }))
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          ))
            .forOpen(openMiddleware)
            .open()
            .catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { getByText } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })
      await getByText('打开对话框').click()
      expect(openMiddleware).toHaveBeenCalled()
      expect(document.querySelector('input')).toHaveValue('test')
      await getByText('取消').click()
    })

    it('应该支持 forConfirm 中间件', async () => {
      const forConfirm = vi.fn()
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          ))
            .forConfirm((form, next) => {
              setTimeout(() => {
                forConfirm(form.values)
                next()
              }, 200)
            })
            .open()
            .catch(console.error)
        }
        return <ElButton onClick={handleOpen}>支持 forConfirm</ElButton>
      }

      const { container } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      await expect.element(container.querySelector('.el-button')).toBeInTheDocument()
      await userEvent.click(container.querySelector('.el-button'))
      const input = document.querySelector('input')
      await userEvent.type(input, 'test')
      const confirmButton = document.querySelector('.el-button--primary')
      await userEvent.click(confirmButton)
      await expect.element(confirmButton).toHaveClass('is-loading')
      await vi.waitFor(() => {
        expect(forConfirm).toHaveBeenCalled()
        expect(forConfirm).toHaveBeenCalledWith({ input: 'test' })
        expect(document.querySelector('.el-dialog__wrapper')).toBeNull()
      })
    })

    it('应该支持 forCancel 中间件', async () => {
      const forCancel = vi.fn()
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          ))
            .forCancel((form, next) => {
              setTimeout(() => {
                forCancel(form.values)
                next()
              }, 200)
            })
            .open()
            .catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { getByText } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      await getByText('打开对话框').click()
      await getByText('取消').click()
      expect(document.querySelector('.el-dialog__wrapper')).toBeNull()
      await vi.waitFor(() => {
        expect(forCancel).toHaveBeenCalled()
      })
    })
  })

  describe('自定义内容', () => {
    it('应该支持自定义 footer', async () => {
      const forExtra = vi.fn()
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('表单对话框', {
            default: () => (
              <SchemaField>
                <SchemaStringField
                  name="input"
                  title="输入框"
                  x-decorator="FormItem"
                  x-component="Input"
                  x-component-props={{
                    placeholder: '请输入',
                  }}
                  required={true}
                />
              </SchemaField>
            ),
            footer: ({ form, resolve, reject }) => {
              return [
                <ElButton
                  onClick={() => reject()}
                >
                  取消
                </ElButton>,
                <ElButton loading={form.submitting} onClick={() => resolve('extra')}>保存草稿</ElButton>,
                <ElButton
                  type="primary"
                  loading={form.submitting}
                  onClick={() => resolve()}
                >
                  确定
                </ElButton>,
              ]
            },
          }, ['extra']).forExtra((form, next) => {
            forExtra(form.values)
            next()
          }).open().catch(console.error)
        }

        return <ElButton onClick={handleOpen}>打开表单</ElButton>
      }
      const { getByText } = render(() => <TestComponent />)
      await userEvent.click(getByText('打开表单'))
      const input = document.querySelector('input')
      await userEvent.type(input, 'testuser')
      await getByText('保存草稿').click()
      await vi.waitFor(() => {
        expect(forExtra).toHaveBeenCalled()
        expect(forExtra).toHaveBeenCalledWith({ input: 'testuser' })
      })
    })

    it('应该支持自定义标题', async () => {
      const forCancel = vi.fn()
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog({ title: '表单对话框', okText: '确认提交', cancelText: '我不想要了' }, {
            default: () => (
              <SchemaField>
                <SchemaStringField
                  name="input"
                  title="输入框"
                  x-decorator="FormItem"
                  x-component="Input"
                  x-component-props={{
                    placeholder: '请输入',
                  }}
                  required={true}
                />
              </SchemaField>
            ),
            header: ({ reject }) => (
              <div>
                <ElButton onClick={() => reject()}>关闭</ElButton>
                <span>这是标题</span>
              </div>

            ),
          }).forCancel((form, next) => {
            forCancel(form.values)
            next()
          }).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开表单</ElButton>
      }

      const { getByText } = render(() => <TestComponent />)
      await userEvent.click(getByText('打开表单'))
      await expect.element(getByText('这是标题')).toBeInTheDocument()
      await expect.element(getByText('我不想要了')).toBeInTheDocument()
      await expect.element(getByText('确认提交')).toBeInTheDocument()
      await userEvent.click(getByText('关闭'))
      await vi.waitFor(() => {
        expect(forCancel).toHaveBeenCalled()
      })
    })
  })

  describe('异步执行顺序', () => {
    it('应该在弹框打开过程中之后的异步操作会等待表单提交后再执行', async () => {
      const forConfirm = vi.fn()
      const fn1 = vi.fn()
      const TestComponent = () => {
        async function handleOpen() {
          await FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          ))
            .forConfirm((form, next) => {
              setTimeout(() => {
                forConfirm(form.values)
                next()
              }, 200)
            })
            .open()
          fn1()
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      await expect.element(container.querySelector('.el-button')).toBeInTheDocument()
      await userEvent.click(container.querySelector('.el-button'))
      const input = document.querySelector('input')
      await userEvent.type(input, 'test')
      const confirmButton = document.querySelector('.el-button--primary')
      expect(fn1).not.toHaveBeenCalled()
      await userEvent.click(confirmButton)
      await expect.element(confirmButton).toHaveClass('is-loading')
      await vi.waitFor(() => {
        expect(forConfirm).toHaveBeenCalled()
        expect(forConfirm).toHaveBeenCalledWith({ input: 'test' })
        expect(document.querySelector('.el-dialog__wrapper')).toBeNull()
        expect(fn1).toHaveBeenCalled()
      })
    })

    it('应该支持表单校验失败时弹框不会关闭，表单完成后之后的逻辑会继续执行', async () => {
      const forConfirm = vi.fn()
      const fn1 = vi.fn()
      const TestComponent = () => {
        async function handleOpen() {
          await FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          ))
            .forConfirm((form, next) => {
              setTimeout(() => {
                forConfirm(form.values)
                next()
              }, 200)
            })
            .open()
            .catch(console.error)
          fn1()
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      await expect.element(container.querySelector('.el-button')).toBeInTheDocument()
      await userEvent.click(container.querySelector('.el-button'))
      const confirmButton = document.querySelector('.el-button--primary')
      expect(fn1).not.toHaveBeenCalled()
      await userEvent.click(confirmButton)
      await expect.element(document.querySelector('.el-form-item__content .is-error')).toBeInTheDocument()
      await vi.waitFor(() => {
        expect(fn1).not.toHaveBeenCalled()
      })
      const input = document.querySelector('input')
      await userEvent.type(input, 'test')
      await userEvent.click(confirmButton)
      await vi.waitFor(() => {
        expect(fn1).toHaveBeenCalled()
      })
    })
  })

  describe('dOM销毁测试', () => {
    it('应该在dialog成功提交后销毁DOM', async () => {
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          )).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      // 记录初始DOM状态
      const initialBodyChildren = document.body.children.length

      // 打开dialog
      await userEvent.click(container.querySelector('.el-button'))

      // 验证dialog已打开，DOM元素增加
      await expect.element(document.querySelector('.el-dialog')).toBeInTheDocument()
      expect(document.body.children.length).toBeGreaterThan(initialBodyChildren)

      // 填写表单并提交
      const input = document.querySelector('input')
      await userEvent.type(input, 'test')
      const confirmButton = document.querySelector('.el-button--primary')
      await userEvent.click(confirmButton)

      // 等待动画完成和DOM销毁
      await vi.waitFor(() => {
        expect(document.querySelector('.el-dialog')).toBeNull()
      }, { timeout: 2000 })

      // 验证DOM已完全清理，回到初始状态
      await vi.waitFor(() => {
        expect(document.body.children.length).toBeLessThanOrEqual(initialBodyChildren + 2) // +1 for test container
      }, { timeout: 2000 })
    })

    it('应该在dialog取消后销毁DOM', async () => {
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <SchemaField>
              <SchemaStringField
                name="input"
                title="输入框"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入',
                }}
                required={true}
              />
            </SchemaField>
          )).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container, getByText } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      // 记录初始DOM状态
      const initialBodyChildren = document.body.children.length

      await userEvent.click(container.querySelector('.el-button'))
      await expect.element(document.querySelector('.el-dialog')).toBeInTheDocument()
      expect(document.body.children.length).toBeGreaterThan(initialBodyChildren)

      const cancelButton = getByText('取消')
      await userEvent.click(cancelButton)

      await vi.waitFor(() => {
        expect(document.querySelector('.el-dialog')).toBeNull()
        expect(document.body.children.length).toBeLessThanOrEqual(initialBodyChildren + 2) // +1 for test container
      }, { timeout: 2000 })
    })

    it('应该在dialog关闭按钮点击后销毁DOM', async () => {
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <div data-testid="dialog-content">对话框内容</div>
          )).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      // 记录初始DOM状态
      const initialBodyChildren = document.body.children.length

      // 打开dialog
      await userEvent.click(container.querySelector('.el-button'))

      // 验证dialog已打开，DOM元素增加
      await expect.element(document.querySelector('.el-dialog')).toBeInTheDocument()
      expect(document.body.children.length).toBeGreaterThan(initialBodyChildren)

      // 点击关闭按钮（X按钮）
      const closeButton = document.querySelector('.el-dialog__headerbtn')
      await userEvent.click(closeButton)

      // 等待动画完成和DOM销毁
      await vi.waitFor(() => {
        expect(document.querySelector('.el-dialog')).toBeNull()
      }, { timeout: 2000 })

      // 验证DOM已完全清理，回到初始状态
      await vi.waitFor(() => {
        expect(document.body.children.length).toBeLessThanOrEqual(initialBodyChildren + 2) // +1 for test container
      }, { timeout: 2000 })
    })

    it('应该在多次打开和关闭dialog时不造成DOM泄漏', async () => {
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog('测试标题', () => (
            <div data-testid="dialog-content">对话框内容</div>
          )).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container, getByText } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      // 记录初始DOM状态
      const initialBodyChildren = document.body.children.length

      // 多次打开和关闭dialog
      for (let i = 0; i < 3; i++) {
        // 打开dialog
        await userEvent.click(container.querySelector('.el-button'))
        await expect.element(document.querySelector('.el-dialog')).toBeInTheDocument()

        // 关闭dialog
        const cancelButton = getByText('取消')
        await userEvent.click(cancelButton)

        // 等待DOM销毁
        await vi.waitFor(() => {
          expect(document.querySelector('.el-dialog')).toBeNull()
        }, { timeout: 2000 })
      }

      // 验证最终DOM状态没有泄漏
      await vi.waitFor(() => {
        expect(document.body.children.length).toBeLessThanOrEqual(initialBodyChildren + 2) // +1 for test container
      }, { timeout: 2000 })
    })

    it('应该在提供beforeClose回调时正确调用', async () => {
      const beforeCloseMock = vi.fn()
      const TestComponent = () => {
        const handleOpen = () => {
          FormDialog({ title: '测试标题', beforeClose: beforeCloseMock }, () => (
            <div data-testid="dialog-content">对话框内容</div>
          )).open().catch(console.error)
        }
        return <ElButton onClick={handleOpen}>打开对话框</ElButton>
      }

      const { container } = render(() => <TestComponent />, {
        global: {
          stubs: {
            Transition: false,
          },
        },
      })

      // 打开对话框
      await userEvent.click(container.querySelector('.el-button'))
      await expect.element(document.querySelector('.el-dialog')).toBeInTheDocument()

      // 点击关闭按钮（X按钮）触发 beforeClose
      const closeButton = document.querySelector('.el-dialog__headerbtn')
      await userEvent.click(closeButton)

      // 验证 beforeClose 回调被调用
      expect(beforeCloseMock).toHaveBeenCalledTimes(1)
      expect(beforeCloseMock).toHaveBeenCalledWith(expect.any(Function))
    })
  })
})
