---
abbrlink: 2
---

我们考虑如下缩放了的稳态NS方程：
$$
\begin{array}{rrlr}-\nu \Delta \boldsymbol{u}+\boldsymbol{u} \cdot \nabla \boldsymbol{u}+\nabla p & =&\boldsymbol{f} & & \text { in } \Omega, t>0, \\ 

\nabla \cdot \boldsymbol{u} & =&0 & &\text { in } \Omega, t>0, \\ 

\boldsymbol{u} & =&\boldsymbol{g}_D & & \text { on } \partial \Omega_D, \\ \nu \frac{\partial \boldsymbol{u}}{\partial \boldsymbol{n}}-p \boldsymbol{n} & =&\boldsymbol{g}_N && \text { on } \partial \Omega_N \\ \boldsymbol{u} & =&\boldsymbol{u}_0 & & \text { in } \Omega, t=0 .\end{array}
$$

任何一处的边界条件可以有四种情况：

1. 法向速度确定，切向速度确定
2. 法向外力确定，切向速度确定
3. 法向速度确定，切向外力确定
4. 法向外力确定，切向外力确定。

对于管道流，管道壁的切向和法向流速确定，入口和出口的压强确定，边界条件应该使用1、4的组合。用P2-P1混合有限元方法求解此稳态NS方程，由于我们知道的是压强，而不是$\mathbf{g}_N$，因此在FEniCS中应写成`(dot(pressure_inflow*n, v) - dot(nu*nabla_grad(u)*n, v))*ds(marker_inflow)`，但是这样做会有收敛性问题。我尝试删去 $\nu \frac{\partial\mathbf{u}}{\partial\mathbf{n}}$这一项，将FEniCS代码改成了`(dot(pressure_inflow*n, v))*ds(marker_inflow)`，不再有收敛性问题，但是这样得到的解还是原方程的解吗？







$\mathbf{\sigma}$

$\boldsymbol{\sigma}$

$\Sigma$



