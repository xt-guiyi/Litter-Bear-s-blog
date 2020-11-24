<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-19 15:42:22
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-24 18:29:05
-->
<template>
  <base-panel margin="4rem 0 0 0">
    <div class="comment-card">
      <div class="top">
        <h1>发表评论</h1>
        <a  v-show="showCancelReply" @click.capture="cancelReply">取消回复</a>
      </div>
      <form action="#" method="get" class="comment-form">
        <div class="comment-info">
          <div><label>昵称:</label><input v-model.trim="commentFormData.nickname" type="text" name="昵称" id="comment-nickname" placeholder="昵称(必填)"></div>
          <div><label>邮箱:</label><input v-model.trim="commentFormData.email" type="email" name="邮箱" id="comment-email" placeholder="QQ邮箱(必填，将保密)"></div>
          <div><label>网址:</label><input v-model.trim="commentFormData.url" type="url" name="网址" id="comment-url" placeholder="网址(选填)"></div>
        </div>
        <div class="comment-content">
          <textarea v-model="commentFormData.commentContent" name="text" id="textarea"  placeholder="请在这里输入你的评论..."></textarea>
        </div>
        <div class="comment-submit">
          <div type="submit" class="submit" @click="releaseComment">发表评论</div>
        </div>
      </form>
    </div>
  </base-panel>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, h, toRefs } from 'vue'
import { nicknameReg, qqEmailReg, urlReg } from '@/config/RegExp'
import { JSONSchemaType } from 'ajv'
import useFormValidator from '@/composable/useFormValidator'
import { MehTwoTone } from '@ant-design/icons-vue'
import { ArticleComment, submitArticleComment } from '@/api/article'
export default defineComponent({
  name: 'ReleaseComment',
  emits: ['click-cancel-reply', 'update-comment'],
  props: {
    // 显示取消回复按钮
    showCancelReply: {
      type: Boolean,
      default: false
    },
    // 评论谁
    byNickname: {
      type: String,
      required: true
    },
    // 父级评论id
    parentCommentId: {
      type: String,
      required: true
    },
    articleTitle: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    interface CommentFormData {
      nickname: string;
      email: string;
      website?: string;
      commentContent: string;
    }
    const commentFormData = reactive<CommentFormData>({
      nickname: '',
      email: '',
      website: '',
      commentContent: ''
    })
    /** 评论内容json构架 */
    const commentFormSchema: JSONSchemaType<CommentFormData> = {
      type: 'object',
      required: ['nickname', 'commentContent', 'email'],
      additionalProperties: false,
      properties: {
        nickname: {
          type: 'string',
          title: '昵称',
          regexp: `${nicknameReg}`
        },
        email: {
          type: 'string',
          title: '邮箱',
          regexp: `${qqEmailReg}`
        },
        website: {
          type: 'string',
          title: '网址',
          nullable: true,
          regexp: `${urlReg}`
        },
        commentContent: {
          type: 'string',
          title: '评论内容',
          minLength: 1
        }
      },
      errorMessage: {
        properties: {
          nickname: '应该是包含2到7个的任意字符或数字',
          commentContent: '评论内容不能为空',
          email: '应该是qq邮箱格式',
          website: '应该是网址格式'
        }
      }
    }
    const componentInstall = getCurrentInstance()
    const { parentCommentId, byNickname, articleTitle } = toRefs(props)
    console.log(parentCommentId)
    // console.log(byNickname)
    /** 响应取消回复事件 */
    function cancelReply () {
      context.emit('click-cancel-reply')
    }

    /** 发布评论 */
    async function releaseComment () {
      const notification = componentInstall?.appContext.config.globalProperties.$notification
      // 校验表单内容
      const errors = useFormValidator(commentFormSchema, commentFormData)
      // console.log(errors)
      if (errors) {
        errors.forEach((item) => {
          notification.open({
            message: '校验错误',
            description: item.message,
            icon: h(MehTwoTone, { style: 'color: #108ee9' })
          })
        })
      } else {
        // 发表评论
        let articleComentData: ArticleComment = {
          nickname: commentFormData.nickname,
          email: commentFormData.email,
          commentContent: commentFormData.commentContent,
          articleTitle: articleTitle.value
        }

        if (commentFormData.website) {
          articleComentData = Object.assign(articleComentData, { webit: commentFormData.website })
        }
        if (byNickname.value) {
          articleComentData = Object.assign(articleComentData, { byNickname: byNickname.value })
        }
        if (parentCommentId.value) {
          articleComentData = Object.assign(articleComentData, { parentId: parentCommentId.value })
        }
        console.log(byNickname.value)

        const { data } = await submitArticleComment(articleComentData)
        commentFormData.commentContent = ''
        cancelReply()
        context.emit('update-comment')
      }
    }
    return {
      commentFormData,
      cancelReply,
      releaseComment
    }
  }
})
</script>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  flex-direction: column;
}

.top{
  display: flex;
  align-items: center;
  h1 {
    flex: auto;
    font-size: 2.4rem;
    margin-bottom: 0;
  }

  a{
    flex: 0 0 auto;
    font-size: 1.8rem;
    text-align: right;
  }

}

.comment-form{
  font-size: 1.8rem;
  .comment-info {
    input {
      display: inline-block;
      width: 60%;
      height: 4rem;
      line-height: 40px;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      color: #606266;
      outline: 0!important;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      margin:1rem;
      &:focus{
      border-color: #448bff;
      box-shadow: 0 0 0 0.2rem rgba(68,139,255,.25);
      }
    }
  }

  .comment-content {
    textarea {
      width: 100%;
      height: 20rem;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      outline: 0!important;
      &:focus{
      border-color: #448bff;
      box-shadow: 0 0 0 0.2rem rgba(68,139,255,.25);
      }
    }
  }

  .comment-submit{
    height: 3.8rem;

    position: relative;
    .submit {
      height: 3.8rem;
      width: 15rem;
      box-shadow: 0 2px 6px rgba(0,0,0,.1);
      padding-right: 30px;
      padding-left: 30px;
      border-radius: 50px;
      color: #fff;
      border: none;
      background: #448bff linear-gradient(45deg,#448bff,#44e9ff);
      padding-top: 6px;
      padding-bottom: 6px;
      transition: all .2s ease;
      outline: none;
      cursor: pointer;
      position: absolute;
      left: calc( 50% - 7.5rem )
    }
  }
}
</style>
