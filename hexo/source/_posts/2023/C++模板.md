---
abbrlink: 1
---
[[类模板(class template)]]
[[容器类(container class)]]

[[类型参数的标识符]]常使用 T 

[[模板参数]]

[[函数模板的重载]]


1. 声明或定义普通模板函数需要指明模板参数，但在模板类的内部声明或定义成员函数可以省略模板参数
```c++
template<typename T>
class Stack {
	Stack (Stack const&); // copy constructor 
	Stack& operator= (Stack const&); // assignment operator
};
```

```c++
template<typename T> bool operator== (Stack<T> const& lhs, Stack<T> const& rhs);
```
2. 在类外定义类的成员函数
```c++
template<typename T> void Stack<T>::push (T const& elem) 
{ 
	elems.push_back(elem); // append copy of passed elem 
}
```
3. 使用类模板时需指明模板参数
```c++
Stack< int> intStack;
```
4. 并不是每个模板成员函数都会被实例化，和模板函数一样，只有在被调用时才会实例化，静态成员函数的实例化规则也是一样的
5. 实例化后的类模板可以像普通模板一样使用
```c++
using IntStack = Stack <int>;
```
6. 对模板参数类型的唯一要求：支持类模板中对它的使用(运算符，构造函数等等)。如果类模板的一些成员函数自始至终都未被调用，则可不考虑它们对类型的使用。
7. [[Concept]]：从一系列类模板或函数模版中抽象出来，对模板参数的限制条件，==为模板显式地提供接口==，例如[[可随机进入的迭代器(random access iterator)]]和[[可默认构造的(default constructible)]]。例如，可通过[[类型萃取(type traits)]]限制模板参数是[[可默认构造的]]：
```c++
template<typename T> class Apple
{ 
	static_assert(std::is_default_constructible<T>::value, "Class C requires default-constructible elements");
};
```
8. 友元函数：略过。
9. 只特化模板类的一个成员函数。
```c++
template<> class Stack<std::string> {

};
```
```C++
void Stack<std::string>::push (std::string const& elem) { 
	elems.push_back(elem); // append copy of passed elem 
}
```
10. 特化模板类专门处理指针
```c++
template<typename T> class Stack<T*> {

}
```
11. 部分特化

[[类型别名(Type Aliases)]]


[[桥接模式(Bridge pattern)]]
1. 基于virtual function的实现
Interface 的一个成员为指向 Implementation 抽象基类的指针，Interface调用该抽象基类的成员函数来实现功能。抽象基类定义了这些功能的接口，由派生类实现这些接口。
![[Pasted image 20230517143636.png]]
2. 基于类模板的实现
Interface 的一个成员为 Implementation 类型的模板参数，Interface调用该模板参数类型的成员函数来实现功能。
  ![[Pasted image 20230517150936.png]]
[[动态多态(dynamic polymorphism)]]
[[静态多态(static polymorphism)]]
[[抽线基类(abstract base class,ABC)]]
[[虚成员函数]]
[[共性(commonality)]]
[[异质容器]]
[[有界动态多态]]
[[无界静态多态]]

[[侵入的]]：我的理解是，派生类会受到基类影响
[[类型安全(type safe)]]：静态多态是更加类型安全的，一部分原因是避免指针转换
[[curiously recurring template pattern(CRTP)]]
[[接口的绑定]]

[[泛型编程(Generic Programming)]]:
[[泛 型 参 数 编 程 ( programming with generic parameters)]]:
[[发现有效算法的最佳抽象表达 (finding the most abstract representation of efficient algorithms)]]:


[[泛型编程]]有时候也被定义成[[模板编程]]，[[面向对象编程]]被认为是基于[[虚函数的编程]]。
[[标准模板库(Standard Template Library, STL)]]:
[[C++标准库(C++ standard library)]]提供了算法和容器。算法不是容器本身的成员函数，可用于任意类型的容器，前提是容器有对应的[[迭代器(iterators)]]。泛型的关键是迭代器，迭代器提供了特定的、可以被算法使用的接口。

泛型操作等价于算法。

SFINAE

[[泛型设计原则(generic design principles)]]
[[面向对象设计原则(object oriented principles)]]
[[National Institutes of Health Class Library(NIHCL)]]





