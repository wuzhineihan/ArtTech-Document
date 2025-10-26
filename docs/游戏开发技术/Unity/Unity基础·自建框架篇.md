# Unity 基础 - 自建框架 篇

> 本页面由[李杰](../../社团介绍/成员.md)编写并发布

## 概述

尽管 Unity 提供了丰富的功能和组件，但在某些情况下，我们可能需要构建自己的框架来满足特定需求。自建框架可以帮助我们更好地组织代码，提高可重用性和可维护性。

自建框架的核心思想是将常用的功能模块化，形成独立的组件或服务。这样，我们可以在不同的项目中复用这些模块，减少重复工作。

Unity 框架方面有很多优秀的开源项目，这里只推荐一个：

- [Game Framework](https://gameframework.cn/)

需要**注意**的是，在之前也说过，游戏业务需求是千变万化的，**没有任何一个框架能够满足所有需求**。自建框架更重要的是学习设计模式，和最佳实践。并在自己的项目中视情况使用所学的东西。

但是不得不提的是，像GameJam这样的时间紧任务重的开发，使用成熟的框架可以大大节约时间。把更多的精力投放到核心玩法上。

## 实践路径

一个实用的Unity框架，一般会包含以下几个功能模块（这几个模块在大型项目中往往不可或缺）：

可以尝试自己实现，不断优化，体会其中的设计思想。

也可以直接阅读成熟项目的源码，学习别人的设计思路。

### 事件系统

> 请先了解事件是什么，如果你能理解 观察者模式，事件的订阅和发布，这些概念，那差不多就可以继续往下看了

事件系统是游戏框架中一个非常重要的组成部分。它允许不同的组件之间进行通信，而不需要直接引用对方，从而实现松耦合。

具体的，事件系统由一个**单例的事件管理器（EventManager）**作为**事件总线**来管理所有的事件，所有要订阅和发布的事件都通过这个中介来完成。

形象得讲，就是一个邮局，你要寄信给某个人，你把信交给邮局，邮局再帮你送到收信人手中。

#### 代码参考
```csharp

/// <summary>
/// <p>简单的事件总线实现</p>
/// <p>支持事件的订阅、取消订阅和发布</p>
/// <p>需要注意的是：1.该实现并不支持异步事件；2.使用事件类型Type作为字典的key并非唯一选择，可以使用其他方式来标识事件，如字符串、枚举、整形等</p>
/// </summary>
public sealed class EventBus {
	private EventBus() { }
	public static EventBus Instance { get; private set; } = new();

	// 事件表，按照事件类型存储对应的监听器列表
	private Dictionary<Type, List<Delegate>> eventTable = new();

	/// <summary>
	/// 订阅事件
	/// </summary>
	public void Subscribe<T>(Action<T> listener) {
		Type eventType = typeof(T);
		if (!eventTable.ContainsKey(eventType)) {
			eventTable[eventType] = new List<Delegate>();
		}
		eventTable[eventType].Add(listener);
	}

	/// <summary>
	/// 取消订阅事件
	/// </summary>
	public void Unsubscribe<T>(Action<T> listener) {
		Type eventType = typeof(T);
		if (eventTable.ContainsKey(eventType)) {
			eventTable[eventType].Remove(listener);
		}
	}

	/// <summary>
	/// 发布事件
	/// </summary>
	public void Publish<T>(T eventData) {
		Type eventType = typeof(T);
		if (eventTable.ContainsKey(eventType)) {
			foreach (var listener in eventTable[eventType]) {
				((Action<T>)listener)?.Invoke(eventData);
			}
		}
	}
}
```

### 对象池

简单且有效的性能优化手段。

对于C#而言，**创建和销毁**对象都是比较耗时的操作，其中涉及到内存的分配和回收，对于GC语言C#来说，频繁的创建和销毁对象会导致垃圾回收器频繁工作，从而影响性能。

对象池的思想就是在不需要某个对象的时候，不是直接销毁，而是将其放回对象池中，对象依然存在，但是不显示不工作。在下一次需要创建对象的时候，先从对象池中取出一个可用的对象，而不是重新创建一个新的对象。

#### 代码参考

```csharp
// 实现方式多样，这里只是一个简单的示例
public class ObjectPool<T> where T : new() {
	private readonly Stack<T> pool = new Stack<T>();

	/// <summary>
	/// 获取对象
	/// </summary>
	public T Get() {
		// 如果是Unity对象，需要调用SetActive(true)等方法使之恢复工作状态，或者留到方法外再处理。
		return pool.Count > 0 ? pool.Pop() : new T();
	}

	/// <summary>
	/// 向对象池归还对象
	/// </summary>
	public void Release(T obj) {
		// 如果是Unity对象，需要调用SetActive(false)等方法使之不工作。
		pool.Push(obj);
	}
}
```

### UI 管理

Unity 提供了强大的 UI 系统，如 UGUI、UI Toolkit 等，这里选择相对简单的 UGUI 作为示例。

当项目中的UI层级变得复杂时，切换UI界面，管理UI元素的显示、隐藏、遮挡等操作会变得异常繁琐，有一套完善的UI管理系统可以大大简化这些操作。

代码较为复杂，可以参考成熟的框架实现。

笔者自己写的框架的大致思路：
1. 预创建多个UI Canvas对象，分别对应不同大类的UI层级（如底层UI、普通UI、弹出UI、顶层UI等）。
2. 每个Canvas下管理多个UI面板（派生自某个PanelBase基类，实现基础的显示、隐藏等功能），Canvas对象要负责自己下面的UI面板的打开和关闭，并依据记录的打开顺序来处理遮挡关系。
3. 在最外层的UI管理器（UIManager）中，维护一个UI面板的字典，方便根据名称或类型快速查找和操作UI面板。


### 数据持久化

数据持久化是游戏开发中非常重要的一环。它涉及到如何将游戏中的数据保存到本地存储中，以便在下次启动游戏时能够恢复之前的状态。

首先在Unity中用户存档等数据一般建议存储在`UnityEngine.Application.persistentDataPath`路径下，这样可以确保数据在不同平台上都能正确存储和访问。

接下来是如何将代码中的对象转换和可以存储的格式相互转换（序列化和反序列化），常见的方式有：

- JSON 序列化。将游戏对象转换为JSON格式的文本文件。
  - **不推荐**使用Unity自带的JsonUtility（笔者被这玩意坑过），因为功能过于简单，推荐使用第三方库如 Newtonsoft.Json。
- XML 序列化。将对象转换为XML格式的文本文件。
  - 可读性较好，但文件体积较大，效率较低。
- 二进制序列化。直接将对象转换为二进制格式，存储为文件。
  - 效率更高，但可读性差，一般用于对性能要求较高的场景。
  - 注意可能存在安全隐患，读取不受信任的二进制数据时要小心。

对于不同的序列化方式，可以根据项目的需求进行选择。如果不确定的话，可以采用策略模式，允许在运行时选择不同的序列化方式。下面给出策略接口设计参考：

```csharp
/// <summary>
/// 序列化策略接口，支持多种序列化实现
/// </summary>
public interface ISerializationStrategy<TData> {
	TData Serialize<T>(T obj);
	T Deserialize<T>(TData data);
}
``` 

> *最后更新：2025年10月*
