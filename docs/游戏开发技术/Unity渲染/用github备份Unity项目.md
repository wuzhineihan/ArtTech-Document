> 本页面由[胡嘉悦](../../社团介绍/成员.md)于 2025.10.6 编辑并发布

<small> 

>借助 GitHub 可以方便地查看每次修改记录，并在出现问题时快速回滚到稳定版本。
尤其是在“项目正常，突然想尝试一个大胆的想法，又担心改崩了”的场景，非常实用。

</small>

### 创建 Unity 项目的 GitHub 仓库

可以参考以下视频教程：
[使用Github在6分钟内备份你的Unity游戏](https://www.bilibili.com/video/BV16V411N7K2/?spm_id_from=333.788.comment.all.click&vd_source=b494db6c8f6cf9d675a0cca5dde89df7)

![image.png](../../assets/images/UnityGameArt/image%2013.png)
<small> Git ignore Unity，会忽略项目可以自动生成的Library等文件夹，减少体积</small>

### 克隆项目仓库到本地

克隆到本地后 打开 Unity Hub → “添加现有项目” → 选择该文件夹
，Unity 会自动检测项目结构并生成 `Library`等文件。

如果提示缺文件或打不开项目，可以：
- 另建一个同版本的空白项目；
- **只复制空白项目生成的 `Library/` 文件夹** 到仓库目录；
- 不要覆盖 `.git`、`Assets`、`Packages` 等内容。

### Unity Git 合并冲突解决

使用 Unity 官方提供的 **Smart Merge 工具（UnityYAMLMerge）** 来解决 Git 中 `.unity` 或 `.prefab` 文件的合并冲突。

1、在C 盘的 .gitconfig 文件中全局配置

```jsx
[merge]
    tool = unityyamlmerge

[mergetool "unityyamlmerge"]
    cmd = "\"D:/software/Unity Hub/Editor/2022.3.13f1c1/Editor/Data/Tools/UnityYAMLMerge.exe\" merge -p \"$BASE\" \"$REMOTE\" \"$LOCAL\" \"$MERGED\""
    // 修改为对应编辑器版本的路径位置
    trustExitCode = true
```

或者使用命令行版本：

```jsx
git config --global merge.tool unityyamlmerge
git config --global mergetool.unityyamlmerge.cmd "\"\"D:/software/Unity Hub/Editor/2021.3.16f1/Editor/Data/Tools/UnityYAMLMerge.exe\" merge -p \\\"$BASE\\\" \\\"$REMOTE\\\" \\\"$LOCAL\\\" \\\"$MERGED\\\"\""
git config --global mergetool.unityyamlmerge.trustExitCode true
```

2、Git Bash 进入项目文件夹
cd /d/UnityProject/XXproject

3、执行调用

`git mergetool`

4、回到git desktop尝试重新提交