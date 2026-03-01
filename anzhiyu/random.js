var posts=["posts/deng-ji/","posts/wu-xian-dian/","posts/tai-wan-kun-jing/","posts/zheng-shi-li-shi/","posts/liu-lang-di-qiu/","posts/ling-ri-gong-ji/","posts/zui-zhi-yu-pai-xu/","posts/pian-zi-chai-lin-wu/","posts/cf-tu-xiang-zhuan-huan/","posts/gong-quan-li-de-lao-long/","posts/zi-fu-chuan-yu-shu-zu/","posts/qing-chu-fu-dong-tan-tao/","posts/js-yu-jia-zai-qu-fen/","posts/set-yu-map/","posts/zheng-di-bu-chang-yu-wei-quan/","posts/class-gou-zao-qi/","posts/c-yu-yan-zhi-zi-zeng-tan-tao/","posts/twikoo-bu-shu/","posts/guan-xin-bing-yu-ji-jiu-ce-lue/","posts/zuo-zhong-you-san-lan-shi-bu-ju/","posts/audio-kong-jian-cha-ru/","posts/hexo-guo-lu-qi-jie-duan/","posts/shu-zu-qu-chong-de-5-chong-fang-fa/","posts/absolute-tan-tao/","posts/telegram-ce-shi/","posts/vercel-bu-shu-fang-shi-tan-tao/","posts/cf-qu-yu-dns-pi-liang-shan-chu/","posts/css-xuan-ze-qi-you-xian-ji-yu-quan-chong/","posts/kali-po-jie-wifi/","posts/git-yu-ssh-gong-si-key/","posts/lian-xiang-sou-suo-zhi-bai-du-jsonp/","posts/js-shu-ju-lei-xing-zhuan-huan-ji-yun-suan-fu/","posts/js-huo-qu-dang-qian-dian-ji-yuan-su-de-suo-yin/","posts/shi-yong-surge-fa-bu-qian-duan-xiang-mu/","posts/jiang-wen-ben-kuang-mo-ren-bei-jing-chong-zhi-wei-bai-se/","posts/cloudns-yu-ming-tuo-guan-dao-cf/","posts/margin-chong-die-yu-bfc-tan-tao/","posts/anzhiyu-theme-tan-tao/","posts/inline-block-jian-xi-xiao-chu/","posts/java-class-zhong-de-gou-zao-fang-fa/","posts/wamp-server-pei-zhi-duo-zhan-dian/","posts/cfpages-cacherules/","posts/commonjs-yu-es6module/","posts/console-log-obj-tan-tao/","posts/js-jq-huo-qu-gun-dong-tiao-gao-du-ji-liu-lan-qi-kuan-gao/","posts/shell-ji-github-workflow-chu-tan/","posts/serv00-setupalive-cftunnel/","posts/vue-zhong-transition-zhi-enter-leave-deng/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"慢才后生","link":"https://eamon.dpdns.org/","avatar":"/icons/icon-96x96.webp","descr":"流星聚集地，灵感的源泉","siteshot":"/icons/w300.webp","color":"#646cff","tag":"生活"},{"name":"备站1","link":"https://nt.eamon.dpdns.org/","avatar":"/icons/icon-96x96.webp","descr":"流星聚集地，灵感的源泉","siteshot":"/icons/w300-1.webp","color":"#646cff","tag":"备站1"},{"name":"备站2","link":"https://eamon.ggff.net/","avatar":"/icons/icon-96x96.webp","descr":"流星聚集地，灵感的源泉","color":"#646cff","tag":"备站2"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };