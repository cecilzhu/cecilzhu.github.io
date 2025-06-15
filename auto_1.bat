chcp 65001
@echo off
REM  报错也不退出 `cmd /k`、`%cd%`输出当前路径、`pause中断执行`、（`::`注释不能打印，REM注释能作为语句打印）、默认`@echo on`（打印代码和执行路径）`、`chcp 65001`显示中文
title hexo-blog-deploy

cd .deploy_git
if EXIST ".github" (
  cd ..
  goto HEXO-WORK
)
goto AddGithubWorkflow

:HEXO-WORK
echo  ---------------------页面生成，发布-----------------------
echo Enter Number to start work.....[`C_G_D-----1 或 回车符`,`C_G-----2`,`_D-----3`,]
set/p "cho=>"
if '%cho%' == '' goto C_G_D
if %cho% == 1 goto C_G_D
if %cho% == 2 goto C_G
if %cho% == 3 goto _D
echo Invalid choice.
echo %cd%
goto HEXO-WORK

:C_G_D
hexo clean | hexo generate | hexo deploy
IF NOT %ERRORLEVEL% == 0 (
    echo Error: hexo C_G_D failed......
    goto HEXO-WORK
)
echo hexo C_G_D successfully........
goto HEXO-WORK

:C_G
hexo clean | hexo generate
IF NOT %ERRORLEVEL% == 0 (
    echo Error: hexo generate failed......
    goto HEXO-WORK
)
echo hexo generate successfully........
goto HEXO-WORK

:_D
hexo deploy
IF NOT %ERRORLEVEL% == 0 (
    echo Error: hexo deploy failed......
    goto HEXO-WORK
)
echo hexo deploy successfully........
goto HEXO-WORK

:: （若有必要）复制`.github`工作流 文件夹--------
:AddGithubWorkflow
echo  ---------------------新增`.github`工作流 文件夹-----------------------
md ".github"
cd ..
if EXIST ".github" (
  xcopy ".github" ".deploy_git\.github" /E /I /Y
  echo ".github" copyed successfully......

  cd .deploy_git
  git add .
  git commit -m "Add vercel workflow"
  git push https://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@github.com/cecilzhu/cecilzhu.github.io.git dev
  echo ----新增`.github`工作流文件，发布成功----
  goto HEXO-WORK
)
echo ".github" is not exist......新增`.github`工作流 failed
goto End

:End

cmd \k
