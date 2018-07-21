# Git learning

## 配置

````markdown
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
````

## 创建版本库

### step 1

````markdown
$ mkdir learngit
$ cd learngit
$ pwd
/e/learngit2
````

`mkdir` 创建文件夹</br>
`cd` 打开文件夹</br>
`pwd` 显示当前目录

### step 2

````markdown
$ git init
Initialized empty Git repository in E:/learngit2/.git/
````

把这个目录变成Git可以管理的仓库

### step 3

```` markdown
$ git add readme.md
````

`git add` 把文件添加到仓库

````markdown
$ git commit -m "wrote a readme file"
[master (root-commit) fa6b3d5] wrote a readme file
 1 file changed, 31 insertions(+)
 create mode 100644 Readme.md

````

`git commit` 把文件提交到仓库

### 小结：
初始化一个Git仓库，使用`git init`命令。</br>
添加文件到Git仓库，分两步：</br>
&nbsp; &nbsp; 1、使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；</br>
&nbsp; &nbsp; 2、使用命令`git commit -m <message>`，完成。

## 状态与修改的内容

`git status` 获取工作区的状态</br>
如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。

## 版本回退

1、`HEAD`指向的版本为当前版本</br>
2、使用命令`git reset --hard commit_id`在版本的历史之间穿梭</br>
 `git reset --hard HEAD^`回退到上一个版本，`git reset --hard HEAD^^`回退到上上个版本，`git reset --hard HEAD~100`回退到往上100个版本<br>
 3、`git log`查看提交历史，确定回退版本</br>
 `git log --pretty=oneline`简化输出信息</br>
 4、`git reflog`查看命令历史，确定回到未来的哪个版本