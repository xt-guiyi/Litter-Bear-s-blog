<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-19 18:31:11
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-24 16:43:01
-->
<template>
  <base-panel margin="2rem 0 2rem 0">
    <div class="comment-container">
      <div class="left">
        <a>
          <img :src="avatar" >
        </a>
      </div>
      <div class="right">
        <div class="comment-meta">
          <span class="comment-author"><b>{{ nickname }}</b></span>
          <div class="comment-metadata">{{ transformCommentTime }}</div>
        </div>
        <div class="comment-content">
          <span class="comment-author-at" v-show="atNickname" v-text="'@'+atNickname"></span>
          <span class="comment-content-true">
            <p>{{ commentContent }}</p>
          </span>
        </div>
        <div class="comment-reply">
          <a @click="emitReply">回复</a>
        </div>
      </div>
    </div>
    <div class="two-comment">
      <slot name="two-comment" :parentNickname="nickname"></slot>
    </div>
  </base-panel>
</template>

<script lang="ts">
import { computed, defineComponent, inject, provide, ref, toRefs } from 'vue'
import BasePanel from './base/BasePanel.vue'
import { transformTimes } from '@/utils/commonUse'
export default defineComponent({
  components: { BasePanel },
  name: 'Comment',
  props: {
    // 头像
    avatar: {
      type: String,
      required: true
    },
    // 评论人昵称
    nickname: {
      type: String,
      default: '昵称'
    },
    // 被评论人昵称
    byNickname: {
      type: String,
      default: null
    },
    // 父级评论人id
    parentId: {
      type: String,
      default: null
    },
    // 父级评论人昵称
    parentNickname: {
      type: String,
      default: null
    },
    // 评论内容
    commentContent: {
      type: String,
      default: '评论内容'
    },
    // 评论时间
    commentTime: {
      type: String,
      default: '评论时间'
    }
  },
  emits: ['click-reply'],
  setup (props, context) {
    const { parentId, parentNickname, nickname, byNickname } = toRefs(props)
    provide('nickname', props.nickname)
    const transformCommentTime = ref('')
    // at关系
    const atNickname = computed(() => {
      if (byNickname.value) {
        const nicknameAll = byNickname.value.split('/')
        const length = nicknameAll.length
        if (length > 1) {
          return nicknameAll[1]
        } else {
          return nicknameAll[0]
        }
      }
      return undefined
    })

    transformCommentTime.value = transformTimes(props.commentTime)

    /** 响应回复事件 */
    function emitReply (e: Event) {
      // console.log(parentNickname)
      let nicknameAll
      if (parentNickname.value) {
        nicknameAll = `${parentNickname.value}/${nickname.value}`
      } else {
        nicknameAll = `${nickname.value}`
      }
      context.emit('click-reply', e.target, nicknameAll, parentId.value)
    }

    return {
      emitReply,
      transformCommentTime,
      atNickname
    }
  }
})
</script>

<style lang="scss" scoped>
.comment-container{
  min-height: 12rem;
  display: flex;

}

.left {
  flex: 0 0 8rem;
  a {
    height: 6rem;
    width: 6rem;
    display: inline-block;
    img {
      height: inherit;
      width: inherit;
      border-radius: 50%;
    }
  }
}

.right {
  flex: auto;
  .comment-meta{
    height: 6rem;
    font-size: 2rem;
    .comment-metadata{
      font-size: 1.4rem;
    }
  }
  .comment-content{
    display: flex;
    font-size: 2rem;
    .comment-author-at {
      font-weight: 700;
    }
    .comment-content-true {
      p {
        margin-bottom: 0;
      }
    }
  }

  .comment-reply {
    font-size: 2rem;
  }
}

.two-comment {
  margin-left: 8rem;
}
</style>
