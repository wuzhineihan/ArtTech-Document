# C# 编程能力进阶

> 本页面由[李杰](../../社团介绍/成员.md)编写并发布

本文档会提供提升C#编程能力的学习路线。


## 设计模式

在游戏开发领域，业务需求变化较快，代码迭代频繁，如何写出便于维护的代码尤为重要。

设计模式是软件开发中常用的解决方案，掌握设计模式，编写更高效、可维护的代码。

个人认为设计模式就是**SOLID**原则的具体化。

推荐的教学资源：

- [Refactoring Guru 设计模式教程](https://refactoringguru.cn/design-patterns/catalog)
- [马士兵设计模式教程 👇](https://www.bilibili.com/video/BV1osyHY3Ev8)
<div style="display: flex; justify-content: center; align-items: center; width: 100%;">
	<div style="position: relative; width: 100%; max-width: 800px; aspect-ratio: 16/9;">
		<iframe src="https://player.bilibili.com/player.html?bvid=BV1osyHY3Ev8" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.15);" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

<br>

另外，笔者作以下提醒和总结：

1. 设计模式不是固定的代码形式，而是**构建代码的思想**。不需要死记硬背，理解其背后的意图更为重要
2. **不要过度设计**，设计模式是为了解决问题，而不是制造问题

---

## C# 进阶

如果你已经认真学习完刘铁猛老师的C#入门课程，并且完成了第一个Unity项目，那么你已经掌握了C#的基础知识。

接下来，如果想要深入学习，内容会非常多，每一点都可以展开非常多知识点，还是要结合实际项目进行学习。

具体来说**剩下的二级目录内容你都可以不看（大多是笔者的杂谈，不太可能在这样的篇幅把详细的内容讲清楚）**。
而是直接看书：

- [《C# in Depth》](https://zh.z-library.sk/book/4974128/045ddc/c-in-depth-fourth-edition.html)
- [《CLR via C#》](https://zh.z-library.sk/book/22982527/ec9213/clr-via-c-%E7%AC%AC3%E7%89%88.html)

或者直接阅读[微软官方文档](https://learn.microsoft.com/zh-cn/dotnet/csharp/)。

作为进阶内容，以下是几个重要的话题：

### 异步编程

异步就是让程序在等待某些操作完成时，能够继续执行其他任务，从而提高效率。

比如，在加载资源的时候，你一定会看到加载进度条，这就是异步编程的一个应用。

然而在游戏逻辑的设计上，Unity淡化了异步的概念（后面你就会知道异步很难写对）。

你可能就要问了，“哎？教程中不是教了 `coroutine` 什么的就是可以实现让某个效果在等待特定时间后发生吗，这不是异步吗？”。

这确实是“异步”。但是是由 Unity 引擎在 **单线程(主线程)** 中通过 **“协程”** 实现的“假”异步。它并没有真正地让程序并行执行，而是通过在每一帧中分割任务来实现的。

这样极大地降低了实现异步效果的难度，让编程能力较弱的初学者也能快速上手。但是 Unity 的异步编程模型在复杂场景下可能会导致性能问题，理解异步操作我们可以更加充分地利用现代多核 CPU，写出更高效的程序。

C#是一门设计优美的语言，你可以通过简单的 `async` `await` `lock` `Task` 等来实现异步编程。

但是最基础的概念还是要理解清楚，推荐的资源：

- [优质C#异步讲解视频](https://www.bilibili.com/video/BV1prtrzCE41)

### 反射

反射是指程序在 **运行时** 能够 **检查和修改自身结构** 的能力。如果有了解的，可以对比一下c++在**编译期**的元编程，感受二者的区别。

反射的重要性可以直接体现在隔壁的Unreal引擎。Unreal引擎通过自研的反射系统（基于宏和代码生成），让原本不具备运行时反射能力的C++（未来可能会有）也能支持蓝图等可视化脚本和动态特性。

而C#是自带反射能力的，比如你有没有想过一个问题，为什么 Unity 的 inspector 面板能够显示你写在脚本中的字段？即使字段是私有的（不使用反射，你在自己的代码中都无法访问）也能显示？这就是反射的功劳。

反射的具体形式有很多，最常见的包括 `Type` `Assembly` `Attribute` 等等。

这里举一个笔者项目中，一个自动注册ECS系统中全部System的例子：

```csharp
// 通过反射自动注册所有实现了 ISystem 接口的系统
protected override void RegisterSystems() {
	// 从当前程序集(Assembly)中获取所有类型(Type)
	foreach (var type in Assembly.GetExecutingAssembly().GetTypes()) {
		// 检查类型是否实现了 ISystem 接口且不是抽象类
		if (typeof(ISystem).IsAssignableFrom(type) && !type.IsAbstract) {
			World.SystemManager.RegisterSystem(type);
		}
	}
}
```

值得注意的是，反射的性能开销往往较大（你可以试着`ctrl + click`点开反编译出来的Type类的源码，其中会包含非常多的信息），在编写高性能代码时需要谨慎使用。

### LINQ

LINQ（Language Integrated Query）。

**LINQ！LINQ！LINQ！伟大的 LINQ！程序员的寿命延长器！**

LINQ（Language Integrated Query）是C#中极具特色的功能之一。它让你可以用类似SQL的方式**优雅**地查询、筛选、排序、分组各种集合和数据源，无论是数组、List，还是数据库、XML、JSON等 **！**

有了LINQ，很多原本需要多层循环、繁琐判断的代码都能变得**简洁、直观** **！** 它不仅提升了代码的**可读性**和**开发效率**，还能让你更专注于业务逻辑本身 **！**

如果你还没用过LINQ，强烈建议花点时间系统学习和实践。掌握LINQ，能让你的C#开发体验上一个台阶。

### 泛型

泛型（Generics）是C#中非常重要的一个特性。它允许你在定义类、接口、方法时使用类型参数，从而实现代码的**复用性**和**类型安全性**。

举一个最简单的例子：

```csharp
// 定义一个水果接口
public interface IFruit {
	float Weight { get; }
	float Price { get; }
}
// 定义一个泛型类，表示能装不同水果的盒子
public class Box<T> : where T : IFruit {
	private List<T> _fruits;
	public Box() {
		_fruits = new List<T>();
	}
	public void AddFruit(T fruit) {
		_fruits.Add(fruit);
	}
}
```
通过使用泛型类 `Box<T>`，你可以创建装不同类型水果的盒子，而不需要在代码层面为每种水果单独定义一个盒子类。同时，泛型还保证了类型安全，编译器会检查你添加到盒子中的水果类型是否符合约束条件。

从编译器的角度来看，这里的泛型会被解释为具体类型，从而避免了运行时的类型转换开销，提高了性能。

上面只是泛型在类定义中的一个简单应用。泛型还可以用于方法、接口等多种场景，帮助你编写更加灵活和高效的代码。

注意理解泛型在编译器角度的意义，这样能更好地设计代码。

### unsafe 代码

众所周知，C#是一门托管语言，拥有垃圾回收机制（GC），这极大地简化了内存管理，让开发者可以专注于业务逻辑。
众所不知，“优秀的C#代码性能能达到C++的80%”（雾

但是，有时候为了追求极致的性能，或者需要与底层系统进行交互，我们可能需要绕过GC的限制，直接操作内存。

C#提供了 `unsafe` 关键字，允许我们编写不受托管环境限制的代码。通过 `unsafe`，我们可以使用指针直接访问内存地址，进行高效的内存操作。

例子：

```csharp
unsafe struct VersionedData {
	public int Major;
	public int Minor;
	// 固定大小的字节数组，用于高频的数据存取
	public fixed byte Data[16];

	public int Checksum() {
		int sum = 0;
		fixed (byte* p = Data) {
			for (int i = 0; i < 16; i++) sum += p[i];
		}
		return sum;
	}
}

unsafe static void Main() {
	// 1) stackalloc：在栈上分配，不参与 GC，生命周期随方法结束
	byte* stackBuf = stackalloc byte[16];
	for (int i = 0; i < 16; i++) stackBuf[i] = (byte)i;

	// 2) 托管数组 + fixed：在 fixed 语句范围内 pin 托管数组，GC 不会移动它
	byte[] managed = new byte[16];
	fixed (byte* pManaged = managed) {
		for (int i = 0; i < managed.Length; i++) pManaged[i] = (byte)(i + 1);
		// 在此范围内，pManaged 指向的内存已被 pin，安全访问
		Console.WriteLine($"managed[5] via pointer = {pManaged[5]}");
	}
	// fixed 结束后，数组可能被 GC 移动

	// 3) GCHandle.Pin：可以跨作用域 pin 托管对象，记得要 Free
	var handle = System.Runtime.InteropServices.GCHandle.Alloc(managed, System.Runtime.InteropServices.GCHandleType.Pinned);
	try {
		IntPtr addr = handle.AddrOfPinnedObject();
		byte* p = (byte*)addr;
		Console.WriteLine($"addr pinned, managed[0] = {p[0]}");
	} finally {
		handle.Free();
	}

	// 4) 本机堆分配（Marshal）：不受 GC 管理，需手动释放
	IntPtr native = System.Runtime.InteropServices.Marshal.AllocHGlobal(16);
	try {
		byte* pn = (byte*)native;
		for (int i = 0; i < 16; i++) pn[i] = (byte)(i + 100);
		Console.WriteLine($"native[10] = {pn[10]}");
	} finally {
		System.Runtime.InteropServices.Marshal.FreeHGlobal(native);
	}

	// 5) fixed buffer 在 struct 内：对局部 struct 取地址通常是安全的（在栈上）
	VersionedData v = new VersionedData();
	v.Major = 1; v.Minor = 0;
	fixed (byte* pv = v.Data) {
		for (int i = 0; i < 16; i++) pv[i] = (byte)(i * 2);
		Console.WriteLine($"v checksum = {v.Checksum()}");
	}

	// 注意：下面这种对托管对象取裸指针但不 pin 是危险的（示例仅作说明，切勿在真实代码中这样做）
	// byte* dangerous;
	// fixed (byte* p = managed) dangerous = p;
	// // fixed 结束后，dangerous 可能成为悬空指针，GC 随时能移动数组 —— 未定义行为
}
```

> *最后更新：2025年9月*
