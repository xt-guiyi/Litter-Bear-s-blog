<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-15 15:34:09
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-26 09:50:32
-->
<template>
  <div id="s" class="panel-container">
    <div class="article-detail-wrap" >
      <base-panel padding="0 0 2rem 0">
        <div class="top-img" :style="topImgStyle"></div>
        <div class="article-main">
            <h1 class="title">{{ articleData.articleTitle }}</h1>
            <div class="article-info">
              <ul>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianchongxing-"></use>
                  </svg>
                  {{ new Date(articleData.releaseTime).toLocaleString() }}
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                  </svg>
                  {{ articleData.commentNumber }}条评论
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yuedu"></use>
                  </svg>
                  {{ articleData.readNumber }}次阅读
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                  </svg>
                  {{ articleData.likeNumber }}人点赞
                </li>
              </ul>
            </div>
            <div class="article-content" v-html="articleData.articleContent"></div>
            <div class="article-copyright">
              <h5>本作品采用 <a rel="license nofollow" target="_blank" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享署名-相同方式共享 4.0 国际许可协议</a> 进行许可</h5>
            </div>
            <div class="article-entry-footer">
              <div class="like-donate">
                <a href="javascript:;"><i>打赏</i></a>
                <a href="javascript:;"><i>点赞</i></a>
                <a href="javascript:;"><i>分享</i></a>
                <div class="share-wrap"></div>
              </div>
              <div class="article-tag-time">
                <div class="left">生活</div>
                <div class="right">最后编辑：{{ new Date(articleData.updatedTime).toLocaleString() }}</div>
              </div>
            </div>
        </div>
      </base-panel>
    </div>
    <div ref="releaseCommentParentRef">
      <div class="release-comment-wrap" ref="releaseCommentRef">
        <release-comment
          @click-cancel-reply="cancelReleaseComment"
          @update-comment="updateCommentList"
          :showCancelReply="showCancelReply"
          :byNickname="byNickname"
          :parentCommentId="parentCommentId"
          :articleId="articleData.articleId"
          />
      </div>
    </div>
    <div class="comment-wrap">
      <comment
        @click-reply='addReleaseComment'
        v-for="(item, index) of articleCommentData"
        :key="index"
        :avatar="item.avatar"
        :nickname="item.nickname"
        :parentId="item._id"
        :commentContent="item.commentContent"
        :commentTime="item.createdAt"
      >
        <template v-slot:two-comment=slotProps>
          <comment
            @click-reply='addReleaseComment'
            v-for="(childrenItem, index) of item.childrenComment.articleCommentList"
            :key="index"
            :avatar="childrenItem.avatar"
            :nickname="childrenItem.nickname"
            :byNickname="childrenItem.byNickname"
            :parentId="childrenItem.parentId"
            :commentContent="childrenItem.commentContent"
            :parentNickname="slotProps.parentNickname"
            :commentTime="childrenItem.createdAt"
          />
        </template>
      </comment>
    </div>
    <div class="pagination-container">
      <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="articleTotal"
        @change="changePage"
        show-less-items
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, provide, reactive, ref, watchEffect } from 'vue'
import ReleaseComment from '@/components/ReleaseComment.vue'
import Comment from '@/components/Comment.vue'
import usePagination from '@/composable/usePagination'
import { insertNode } from '@/utils/dom'
import { getArticleComment, ArticleCommentPaginationData } from '@/api/article'
import { PaginationData } from '@/api/types'
export default defineComponent({
  name: 'ArticleDetailPanel',
  components: {
    ReleaseComment,
    Comment
  },
  setup () {
    // 获取文章数据
    const articleData = JSON.parse(localStorage.getItem('article')!)
    // 文章评论数据
    const articleCommentData = ref<Record<string, any>[]>([])
    const topImgStyle = reactive({
      backgroundImage: `url(${articleData.bgImg})`
    })
    // dom
    const releaseCommentParentRef = ref()
    const releaseCommentRef = ref()
    // 显示回复
    const showCancelReply = ref(false)

    const { currentPage, pageSize, articleTotal, paginationParameter, changePage } = usePagination()
    const byNickname = ref('')
    const parentCommentId = ref('')

    // 发送请求
    async function sendArticleCommentData (paginationParameter: ComputedRef<PaginationData>) {
      const parameter: ArticleCommentPaginationData = Object.assign(paginationParameter.value, {
        articleId: articleData.articleId as string
      })

      const { data } = await getArticleComment(parameter)
      articleTotal.value = data.total
      articleCommentData.value = data.articleCommentList
      // console.log(articleCommentData.value)
    }

    // 响应式副作用
    watchEffect(() => {
      sendArticleCommentData(paginationParameter)
    })

    /** 添加发布评论组件 */
    function addReleaseComment (element: Element, nicknameall: string, parentId: string | null) {
      insertNode(element.parentElement!, releaseCommentRef.value)
      byNickname.value = nicknameall
      parentCommentId.value = parentId || ''
      showCancelReply.value = true
    }

    /** 取消发布评论组件 */
    function cancelReleaseComment () {
      insertNode(releaseCommentParentRef.value, releaseCommentRef.value)
      byNickname.value = ''
      parentCommentId.value = ''
      showCancelReply.value = false
    }

    /** 更新评论列表 */
    function updateCommentList () {
      console.log(1)
      sendArticleCommentData(paginationParameter)
    }
    return {
      articleData,
      articleCommentData,
      topImgStyle,
      showCancelReply,
      addReleaseComment,
      updateCommentList,
      releaseCommentParentRef,
      releaseCommentRef,
      cancelReleaseComment,
      currentPage,
      pageSize,
      articleTotal,
      changePage,
      byNickname,
      parentCommentId
    }
  }
})
</script>

<style lang="scss" scoped>

.top-img {
  width: inherit;
  height: 30rem;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 10px;
}

.article-main{
  margin: 2rem;
  .title {
    height: 6rem;
    line-height: 6rem;
    text-align: center;
    font-size: 3rem;
  }

  .article-info {
        margin: 1rem 0;
        ul {
          display: flex;
          justify-content: center ;
          font-size: 1.5rem;
        }
        li {
          flex: 0 0 auto;
          margin-right: 2rem;
          // text-align: center;
        }
  }

  .article-content {
    font-size: 1.6rem;
  }

  .article-copyright {
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background-color: rgba(220,220,220,.7);
    margin: 25px 0 0;
    font-size: 1.8rem;

  }

  .article-entry-footer {
      margin: 1rem 0 1rem 0;
    .like-donate {
      margin-top: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;

      a {
        width: 13rem;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        margin-left: 2rem;
      }

      a:nth-of-type(1){
        border: 1px solid #3496e6;
        color: #3496e6;
        margin-left: 0;
      }

      a:nth-of-type(2){
        border: 1px solid #e87461;
        color: #e87461;
      }

      a:nth-of-type(3){
        border: 1px solid #78ce79;
        color: #78ce79;
      }
    }

    .article-tag-time {
      font-size: 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {

      }
    }
  }

}

.pagination-container{
  height: 10rem;
  line-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;;
}

</style>
