---
title: Hello World
mathjax: true
---
相册

![3711669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217546.jpg)
<!--more-->


{% gallery %}
![这是一段很长很长的文字，请忽略后面的内容。我自己在本地修改代码调试程序时，commit命令用得比较频繁，很多commit都是一些小修改，而且我会在代码中加入一些私货，我不想它们出现在别人的代码仓库中。我希望在pull request的时候只挑选出一些有用的commit，将它们合并成一个commit，再将它推送到上游仓库。](https://githubimages.pengfeima.cn/images/202211291216879.jpg)
![3711669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217546.jpg)
![3701669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217893.jpg)
![3691669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217240.jpg)
![3681669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216884.jpg)
![3671669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216894.jpg)
![3661669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217904.jpg)
![3651669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217670.jpg)
![3641669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216662.jpg)
![3631669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216722.jpg)
![3621669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217910.jpg)
![3611669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217662.jpg)
![3601669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217355.jpg)
![3591669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217704.jpg)
![3581669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217634.jpg)
![3571669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217655.jpg)
![3561669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217112.jpg)
{% endgallery %}



{% gallery %}
![这是一段很长很长的文字，请忽略后面的内容。我自己在本地修改代码调试程序时，commit命令用得比较频繁，很多commit都是一些小修改，而且我会在代码中加入一些私货，我不想它们出现在别人的代码仓库中。我希望在pull request的时候只挑选出一些有用的commit，将它们合并成一个commit，再将它推送到上游仓库。](https://githubimages.pengfeima.cn/images/202211291216879.jpg)
![3711669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217546.jpg)
![3701669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217893.jpg)
![3691669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217240.jpg)
![3681669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216884.jpg)
![3671669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216894.jpg)
![3661669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217904.jpg)
![3651669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217670.jpg)
![3641669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216662.jpg)
![3631669695359_.pic](https://githubimages.pengfeima.cn/images/202211291216722.jpg)
![3621669695359_.pic](https://githubimages.pengfeima.cn/images/202211291217910.jpg)
![3611669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217662.jpg)
![3601669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217355.jpg)
![3591669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217704.jpg)
![3581669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217634.jpg)
![3571669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217655.jpg)
![3561669695358_.pic](https://githubimages.pengfeima.cn/images/202211291217112.jpg)
{% endgallery %}


$$
e=mc^2
$$


---
title: CFD问题中的稳定性分析
tags: []
categories: []
poster:
  topic: ' '
  headline: CFD问题中的稳定性分析
  caption: null
  color: white
comments: false
abbrlink: 55132
date: 2022-11-30 11:00:22
description:
cover:
banner:
---

&ensp;&ensp;&ensp;&ensp;长期以来，在网上一直能看到这样的论断：因为有限元方法不能使用迎风格式，所以求解CFD问题时会遇到稳定性问题。对此我很困惑，我困惑的是他们为什么要纠结显格式的稳定性问题，用隐格式或半隐格式就是无条件稳定的呀。例如下面这个数值格式
$$
\frac{\boldsymbol{u}^{n+1}-\boldsymbol{u}^n}{\Delta t}+\boldsymbol{u}^{n+1}\cdot\nabla\boldsymbol{u}^{n}=\boldsymbol{f},
$$
<!-- more -->
我只分析时间离散的稳定性

用现代数值计算理论分析一下很容易得出它是无条件稳定的，并且我自己也用数值试验验证过。我认为标准的有限元方法可以求解CFD问题，重点在于构造稳定的时间离散格式和寻找满足LBB条件的有限元空间。我特别希望有人告诉我，我的想法是错的，我哪里错了或者我哪里没考虑到。



&ensp;&ensp;&ensp;&ensp;我在李晓丽的论文中找到下面这样的论述：


求解NS方程的诸多困难之一是如何处理非线性对流项。本质上有三种处理方式：

1. 完全隐式，每个时间步都要求解一个非线性系统。
2. 半隐式，每个时间步都要求解一个变系数椭圆方程，这意味着每个时间步都需要重新组装系数矩阵。
3. 显式，每个时间步只需求解一次Stokes方程(两次Poisson型的方程，如果采用算子分裂格式)，但是有CFL条件限制，如果雷诺数较大，那么时间步长要取得非常小。


&ensp;&ensp;&ensp;&ensp;在Daniel Boffi的论文里是这样考虑对流项的：


NS方程中对流项的变分形式可以写成
$$
b(\mathbf{u}, \mathbf{v}, \mathbf{w})=\frac{\rho_f}{2}((\mathbf{u} \cdot \boldsymbol{\nabla} \mathbf{v}, \mathbf{w})-(\mathbf{u} \cdot \boldsymbol{\nabla} \mathbf{w}, \mathbf{v})),
$$
这一项可以通过代入前一时间步的变量线性化，线性化后可以写成
$$
b\left(\mathbf{u}^n, \mathbf{u}^{n+1}, v\right).
$$
速度的无散度条件和适当的边界条件可以使这一项为零，不会影响数值格式的稳定性。






## 时间离散空间连续

晚上我在看一篇论文：



里面涉及到不可压NS方程全离散格式的稳定性证明，他的证明特别简洁。文中假设了无散度速度场与梯度场是正交的，即
$$
(\mathbf{u},\nabla p)=0.
$$
这其实是对边界条件的要求，其他论文里一般会假设$\mathbf{u}\in H_0^1{(\Omega)}$之类的条件。文中还直接使用了Laplace算子的负定性，即
$$
(\Delta \mathbf{u},\mathbf{u})\le0
$$
这样就能证明时间离散空间连续的情况是无条件稳定的。

## 全离散

下面是可以用投影法求解的全离散格式
$$
\begin{aligned}
&\frac{\mathbf{u}^*-\mathbf{u}^n}{\Delta t}=\frac{v}{2} \Delta^h\mathbf{u}^* +\mathbf{f}\\
&\Delta^h \phi=\frac{1}{\Delta t} \nabla^h \cdot \mathbf{u}^* \\
&\mathbf{u}^{n+1}=\mathbf{u}^*-\Delta t \nabla^h \phi
\end{aligned}
$$
为了证明我们的数值格式是无条件稳定的，在空间离散后，第一个条件就是要求算子$\Delta_h$和算子$\nabla_h$满足可交换性，即
$$
\Delta_h\nabla_h\phi=\nabla_h\Delta_h\phi
$$
这就要求
$$
\Delta_h=\nabla_h\cdot\nabla_h
$$
其次，我们还要求边界条件满足适当要求，使得离散的无散度场和离散的梯度场是正交的，最后还用到了离散Laplace算子的负定性。


## 对流项

对流项使用半隐格式就可以了。


## 投影方法中对流项对稳定性的影响

$$
\begin{aligned}
&\int_{\Omega}\mathbf{u}\cdot\nabla\mathbf{v}\cdot\mathbf{w}\;\mathrm{d}\mathbf{x}\\\\
=&\int_{\Omega}\sum_{i,j}^d u_i\partial_iv_jw_j\;\mathrm{d}\mathbf{x}\\
=&\int_{\Omega}\sum_{i,j}^d \partial_i (u_iv_jw_j)\;\mathrm{d}\mathbf{x}-\int_{\Omega}\sum_{i,j}^d \partial_i (u_iw_j)v_j\;\mathrm{d}\mathbf{x}\\
=&\int_{\Omega}\sum_{i,j}^d \partial_i (u_iv_jw_j)\;\mathrm{d}\mathbf{x}-\int_{\Omega}\sum_{i,j}^d \partial_i u_iw_jv_j\;\mathrm{d}\mathbf{x}-\int_{\Omega}\sum_{i,j}^d \partial_i w_ju_iv_j\;\mathrm{d}\mathbf{x}
\end{aligned}\tag{1}
$$
在用能量放法分析投影方法时，中间会出现一项

$$
\int_{\Omega}\mathbf{u}_n\cdot\nabla\mathbf{u}_*\cdot\mathbf{u}_{n+1}\;\mathrm{d}\mathbf{x}\tag{2}
$$
其中，$\nabla\cdot\mathbf{u}_n=0$，$\nabla\cdot\mathbf{u}_{n+1}=0$，$\mathbf{u}_{n+1}=\mathbf{u}_{*}$。适当假设边界条件，$\mathbf{u}|_{\partial\Omega}=\mathbf{0}$或者$\frac{\partial \mathbf{u}}{\partial \mathbf{n}}|_{\partial\Omega}=\mathbf{0}$。根据(1)的推导，可以得出
$$
\int_{\Omega}\mathbf{u}_n\cdot\nabla\mathbf{u}_*\cdot\mathbf{u}_{n+1}\;\mathrm{d}\mathbf{x}+\int_{\Omega}\mathbf{u}_n\cdot\nabla\mathbf{u}_{n+1}\cdot\mathbf{u}_{*}\;\mathrm{d}\mathbf{x}=0\tag{3}
$$
进而得出
$$
\int_{\Omega}\mathbf{u}_{n}\cdot\nabla (\mathbf{u}_*\cdot \mathbf{u}_{n+1})\;\mathrm{d}\mathbf{x}=0\tag{4}
$$
其实得出这个也没用。必须是后两项相等的情况下才能得出:

$$
\int_{\Omega}\mathbf{u}\cdot\nabla\mathbf{v}\cdot\mathbf{v}\;\mathrm{d}\mathbf{x}=0
$$









