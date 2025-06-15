chcp 65001
@echo off
REM  报错也不退出 `cmd /k`、`%cd%`输出当前路径、`pause中断执行`、（`::`注释不能打印，REM注释能作为语句打印）、默认`@echo on`（打印代码和执行路径）`、`chcp 65001`显示中文

echo  ---------------------页面生成，发布-----------------------
hexo clean | hexo generate | hexo deploy
IF NOT %ERRORLEVEL% == 0 (
    echo Error: hexo failed.
    set /p dummy=Press Enter to exit...
)

:: （若有必要）复制`.vercel`文件夹--------xcopy ".github" ".deploy_git\.github" /E /I /Y

echo  ---------------------发布 新增文件---------------------
cd .deploy_git
git add .
git commit -m "Add vercel workflow"
git push https://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@github.com/cecilzhu/cecilzhu.github.io.git dev

echo 执行成功，回车 退出
set /p dummy=Press Enter to exit...