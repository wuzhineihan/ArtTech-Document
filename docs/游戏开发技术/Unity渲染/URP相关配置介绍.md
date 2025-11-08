## [渲染管线概念（URP Concepts）](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/urp-concepts.html)

> 本页面由[胡嘉悦](../../社团介绍/成员.md)于 2025.10.6 编辑并发布

<small> 

>在浏览Unity教程的过程中，你可能经常要寻找一些带有“Render”“UniversalRP”关键字的设置文件。  
如果你使用Universal 2D/3D模板创建项目，他们通常会自动创建在 Project/Settings/ 路径下。   
在不需要修改URP源码的情况下，你可以不关心它们在干什么，只要跟着教程配置即可。  
如果你对这些文件感到好奇，下面内容可能有用。

</small>



![image.png](../../assets/images/UnityGameArt/image%2014.png)
<small> 在新建项目的时候，选择 **Universal 2D/3D** 模板，使用的就是URP通用渲染管线，这是目前最广泛使用的Unity渲染管线。</small>

![Unity Project → 右键 Create → Rendering](../../assets/images/UnityGameArt/image%2015.png)
<small> Project → 右键 Create → Rendering，如图大概会出现4类不同的URP配置文件</small>

### 1️⃣管线资产（URP Asset）：添加3️⃣ **Renderer List** 、渲染质量配置（色彩范围、Lod、光照、阴影后处理等）

**URP Asset (with 2D Renderer)**：2D 专用的 URP 配置文件，默认绑定 2D 渲染器。

**URP Asset (with Universal Renderer)**：3D/通用渲染的 URP 配置文件，默认绑定 Universal 渲染器。

![image.png](../../assets/images/UnityGameArt/image%2016.png)

### 2️⃣ 渲染扩展（Renderer Feature）：用于在渲染流程中插入自定义 Pass
**C#代码**，继承自ScriptableRendererFeature类

配置方式：在 3️⃣**Renderer**里点 **Add Renderer Feature**，选择自定义或内置的RendererFeature
- 内置的官方示例
  ![image.png](../../assets/images/UnityGameArt/image%2018.png)
👉 详细介绍参考Unity手册
[Pre-built effects (Renderer Features) | Universal RP | 14.0.12](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/urp-renderer-feature.html)
-  直接新建（Project右键Create-Render），会有一个带格式的模板

### 3️⃣ 渲染器资产（URP Renderer）：被Camera的Render栏引用，可以添加2️⃣ Renderer Feature

**URP 2D Renderer**

**URP Universal Renderer**

![image.png](../../assets/images/UnityGameArt/image%2017.png)


### 4️⃣**全局与资源配置（Global/Resource Settings）**

**URP Global Settings Asset**：URP 全局渲染参数（光照层、默认材质等）。

![image.png](../../assets/images/UnityGameArt/image%2023.png)

### 其他
**URP Post-process Data**：URP 内置后处理的资源引用（Shader、Lookup 表等）。

**URP XR System Data**：XR 渲染相关的全局配置（多视图渲染等）。

**Environment Library (Look Dev)**：Look Dev 环境光贴图集合，用于材质/光照测试。

RenderLayer相关[渲染图层 | Universal RP | 14.0.12 --- Rendering Layers | Universal RP | 14.0.12](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/features/rendering-layers.html)