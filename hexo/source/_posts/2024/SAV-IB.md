## 一阶时间离散：

如果边界速度不为0，
$$
E(t)=\frac{\rho}{2}\int_{\Omega}|\mathbf{u}|^{2}+\int_{B_{r}}W(\mathcal{X})
$$

$$
\begin{split}
\frac{dE(t)}{dt}&=\rho\int_{\Omega}\frac{\partial\mathbf{u}}{\partial t}\cdot\mathbf{u}+\int_{B_{r}}\frac{\partial W}{\partial t}\\
&=\rho\int_{\Omega}(\frac{\partial\mathbf{u}}{\partial t}+\mathbf{u}\cdot\nabla\mathbf{u})\cdot\mathbf{u}-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u})|\mathbf{u}|^{2}+\int_{B_{r}}\frac{\partial W}{\partial \mathbb{F}}:\frac{\partial \mathbb{F}}{\partial t}
\end{split}
$$

令$q=\sqrt{E(t)+\delta}$
$$
\begin{split}
\frac{dq}{dt}&=\frac{1}{2}\frac{1}{\sqrt{E(t)+\delta}}\frac{dE(t)}{dt}=\frac{1}{2q}\frac{dE(t)}{dt}\\
&=\frac{1}{2q}\left(\rho\int_{\Omega}(\frac{\partial\mathbf{u}}{\partial t}+\mathbf{u}\cdot\nabla\mathbf{u})\cdot\mathbf{u}-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u})|\mathbf{u}|^{2}+\int_{B_{r}}\frac{\partial W}{\partial \mathbb{F}}:\frac{\partial \mathbb{F}}{\partial t}\right)
\end{split}
$$
那么IB方法等价于
$$
\begin{split}
&\rho(\frac{\partial{\mathbf{u}}}{\partial t}+\frac{q}{\sqrt{E(t)+\delta}}\mathbf{u}\cdot\nabla\mathbf{u})-\mu\Delta \mathbf{u}+\nabla p= \frac{q}{\sqrt{E(t)+\delta}}f\\
&\frac{dq}{dt}=\frac{\rho}{2q}\int_{\Omega}(\frac{\partial\mathbf{u}}{\partial t}+\mathbf{u}\cdot\nabla\mathbf{u})\cdot\mathbf{u}-\frac{\rho}{4q}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u})|\mathbf{u}|^{2}+\frac{1}{2q}\int_{B_{r}}\frac{\partial W}{\partial \mathbb{F}}:\frac{\partial \mathbb{F}}{\partial t}\\
&\nabla\cdot\mathbf{u}=0\\
&\int_{B_{r}}\mathbf{F}\cdot\mathbf{V}=-\int_{B_{r}}\mathbb{P}:\nabla\mathbf{V}\\
&\mathbf{f}=\int_{B_{r}}\mathbf{F}\cdot\delta(\mathbf{x}-\mathcal{X}(\mathbf{X},t) d\mathbf{X}\\
&\frac{\partial\mathcal{X}}{\partial t}=\int_{\Omega}\mathbf{u}\cdot\delta(\mathbf{x}-\mathcal{X}(\mathbf{X},t)) d\mathbf{x}
\end{split}
$$
数值格式：
$$
\begin{equation}\label{1}
\begin{split}
&\rho\frac{\mathbf{u}^{n+1}-\mathbf{u}^{n}}{\Delta t}-\mu\Delta\mathbf{u^{n+1}}+\nabla p^{n+1}=\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n})\\
&\frac{q^{n+1}-q^{n}}{\Delta t}=\frac{1}{2q^{n+1}}\frac{\rho}{\Delta t}\int_{\Omega}(\mathbf{u}^{n+1}-\mathbf{u}^{n})\cdot\mathbf{u}^{n+1}+\frac{\rho}{2\sqrt{E(\bar{t})+\delta}}\int_{\Omega}\mathbf{u}^{n}\cdot\nabla\mathbf{u}^{n}\cdot\mathbf{u}^{n+1}-\frac{\rho}{4q^{n+1}}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u}^{n+1})|\mathbf{u^{n+1}}|^{2}+\frac{1}{2\sqrt{E(\bar{t})+\delta}}\int_{B_{r}}\mathbb{P}^{n}:\frac{ \mathbb{F}^{n+1}-\mathbb{F}^{n}}{\Delta t}\\
&\nabla\cdot\mathbf{u}^{n+1}=0\\
&\int_{B_{r}}\mathbf{F}^{n}\cdot\mathbf{V}=-\int_{B_{r}}\mathbb{P}^{n}:\nabla\mathbf{V}\\
&\mathbf{f}^{n}=\int_{B_{r}}\mathbf{F}^{n}\cdot\delta(\mathbf{x}-\mathcal{X}(\mathbf{X},t) d\mathbf{X}\\
&\frac{\mathcal{X}^{n+1}-\mathcal{X}^{n}}{\Delta t}=\int_{\Omega}\mathbf{u}^{n+1}\cdot\delta(\mathbf{x}-\mathcal{X}(\mathbf{X},t)) d\mathbf{x}
\end{split}
\end{equation}
$$
给方程1-1的两边关于$\mathbf{u}^{n+1}$做$L^{2}$内积,同时利用1-3式可得：
$$
\begin{split}
&\frac{\rho}{\Delta t}\int_{\Omega}(\mathbf{u}^{n+1}-\mathbf{u}^{n})\cdot\mathbf{u}^{n+1}-\mu\int_{\Omega}\Delta\mathbf{u}^{n+1}\cdot\mathbf{u}^{n+1}+\int_{\Omega}\nabla p^{n+1}\cdot\mathbf{u}^{n+1}=\int_{\Omega}\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}(f^{n}-\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n})\cdot\mathbf{u}^{n+1}\\
&\frac{\rho}{\Delta t}\int_{\Omega}(\mathbf{u}^{n+1}-\mathbf{u}^{n})\cdot\mathbf{u}^{n+1}-\left(\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{u}^{n+1}-\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}\right)+\left(\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u}^{n+1})p^{n+1}-\int_{\Omega}p^{n+1}\nabla\cdot\mathbf{u}^{n+1}\right)\\
&=\int_{\Omega}\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}(f^{n}-\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n})\cdot\mathbf{u}^{n+1}\\
&\textcolor{red}{\frac{\rho}{\Delta t}\int_{\Omega}(\mathbf{u}^{n+1}-\mathbf{u}^{n})\cdot\mathbf{u}^{n+1}}-\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{u}^{n+1}+\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}+\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u}^{n+1})p^{n+1}\\
&=\int_{\Omega}\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{f}^{n}\cdot\mathbf{u}^{n+1}\textcolor{red}{-\int_{\Omega}\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n}\cdot\mathbf{u}^{n+1}}
\end{split}
$$
给方程1-2两边同时乘以$2q^{n+1}$可得：
$$
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})=\textcolor{red}{\frac{\rho}{{\Delta t}}\int_{\Omega}(\mathbf{u}^{n+1}-\mathbf{u}^{n})\cdot\mathbf{u}^{n+1}}\textcolor{red}{+\frac{\rho q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\int_{\Omega}\mathbf{u}^{n}\cdot\nabla\mathbf{u}^{n}\cdot\mathbf{u}^{n+1}}-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{u}^{n+1})|\mathbf{u^{n+1}}|^{2}+\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\int_{B_{r}}\mathbb{P}^{n}:\frac{ \mathbb{F}^{n+1}-\mathbb{F}^{n}}{\Delta t}
$$
将上面的两式相加可得：
$$
\begin{equation}
\begin{split}
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})=-\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}+\int_{\Omega}\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{f}^{n}\cdot\mathbf{u}^{n+1}+\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{w}^{n+1}-\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p^{n+1}\\
-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})|\mathbf{w}^{n+1}|^{2}+\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\int_{B_{r}}\mathbb{P}^{n}:\frac{ \mathbb{F}^{n+1}-\mathbb{F}^{n}}{\Delta t}
\end{split}
\end{equation}
$$
令1-4式中的$\mathbf{V}=\mathcal{X}^{n+1}-\mathcal{X}^{n}$, 则
$$
\begin{split}
\int_{B_{r}}\mathbf{F}^{n}\cdot(\mathcal{X}^{n+1}-\mathcal{X}^{n})&=-\int_{B_{r}}\mathbb{P}^{n}:\nabla(\mathcal{X}^{n+1}-\mathcal{X}^{n})\\
&=-\int_{B_{r}}\mathbb{P}^{n}:(\mathbb{F}^{n+1}-\mathbb{F}^{n})
\end{split}
$$
将上式代入中可得：
$$
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})=-\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}+\int_{\Omega}\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{f}^{n}\cdot\mathbf{u}^{n+1}+\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{w}^{n+1}-\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p^{n+1}\\
-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})|\mathbf{w}^{n+1}|^{2}-\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\frac{1}{\Delta t}\int_{B_{r}}\mathbf{F}^{n}\cdot(\mathcal{X}^{n+1}-\mathcal{X}^{n})
$$
对于1-5式关于$\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{u}^{n+1}$关于$L^{2}$做内积可得：
$$
(\mathbf{f}^{n},\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{u}^{n+1})_{\Omega}=(\int_{B_{r}}\mathbf{F}^{n}\cdot\delta(\mathbf{x}-\mathcal{X}(\mathbf{X},t) d\mathbf{X}，\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{u}^{n+1})_{\Omega}
$$
对于1-6式关于$\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{F}^{n}$关于$L^{2}$做内积可得：
$$
\frac{1}{\Delta t}(\mathcal{X}^{n+1}-\mathcal{X}^{n},\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{F}^{n})_{B_{r}}=(\int_{\Omega}\mathbf{u}^{n+1}\cdot\delta(\mathbf{x}-\mathcal{X}(\mathbf{X},t)) d\mathbf{x},\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{F}^{n})_{B_{r}}
$$
根据插值算子和延拓算子满足对偶性可得
$$
\Delta t(\mathbf{f}^{n},\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{u}^{n+1})_{\Omega}=(\mathcal{X}^{n+1}-\mathcal{X}^{n},\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\mathbf{F}^{n})_{B_{r}}
$$
代入表达式中可得
$$
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})=-\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}+\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{w}^{n+1}-\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p^{n+1}\\
-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})|\mathbf{w}^{n+1}|^{2}
$$
定理1：如果边界速度$\mathbf{w}^{n+1}=0$,数值格式满足下面的等式，且是无条件能量稳定的。
$$
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})+\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}=0
$$

## 数值实现过程：

令$S=\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}$,那么N-S方程可写成：
$$
\frac{\rho}{\Delta t}\mathbf{u}^{n+1}+\nabla p^{n+1}-\mu\Delta\mathbf{u^{n+1}}=S(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n}))+\frac{\rho}{\Delta t}\mathbf{u}^{n}\\
$$
由于$\nabla\cdot\mathbf{u}^{n+1}=0$, 那么
$$
\frac{\rho}{\Delta t}\mathbf{u}^{n+1}+\nabla p^{n+1}=S(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n}))+\frac{\rho}{\Delta t}\mathbf{u}^{n}-\mu\nabla\times\nabla\times\mathbf{u}^{n+1}
$$
令$q$是连续空间上的任意测试函数，则上式关于$\nabla q$做$L^{2}$内积可得：
$$
\int_{\Omega}\nabla p^{n+1}\cdot\nabla q=\int_{\Omega}S(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n})\cdot\nabla q-\mu\int_{\partial\Omega}\mathbf{n}\times\mathbf{\omega}^{n+1}\cdot\nabla q-\frac{\rho}{\Delta t}\int_{\Omega}\mathbf{n}\cdot\mathbf{w}^{n+1}q
$$
其中$\mathbf{\omega}=\nabla\times\mathbf{u}$和$\int_{\Omega}\nabla\times\mathbf{\omega}\cdot \nabla q=\int_{\partial \Omega}\mathbf{n}\times\mathbf{\omega}\cdot\nabla q$. 为了简化计算，则$\mathbf{n}\times\mathbf{\omega}^{n+1}=\mathbf{n}\times\mathbf{\bar{\omega}}^{n+1}|_{\partial \Omega}$, 其中$\mathbf{\bar{\omega}}^{n+1}=\nabla\times\mathbf{u}^{n}$, 显示表示。从而上式可表示
$$
\int_{\Omega}\nabla p^{n+1}\cdot\nabla q=\int_{\Omega}S(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n})\cdot\nabla q-\mu\int_{\partial\Omega}\mathbf{n}\times\nabla\times\mathbf{u}^{n}\cdot\nabla q-\frac{\rho}{\Delta t}\int_{\Omega}\mathbf{n}\cdot\mathbf{w}^{n+1}q\\
\int_{\Omega}p^{n+1}=0
$$
上式可求解$p^{n+1}$.

如何求解$p^{n+1}$

1）对于$p^{n+1}_{1}$:
$$
\int_{\Omega}\nabla p_{1}^{n+1}\cdot\nabla q=-\mu\int_{\partial\Omega}\mathbf{n}\times\nabla\times\mathbf{u}^{n}\cdot\nabla q-\frac{\rho}{\Delta t}\int_{\Omega}\mathbf{n}\cdot\mathbf{w}^{n+1}q\\
\int_{\Omega}p_{1}^{n+1}=0
$$
1）对于$p^{n+1}_{2}$:
$$
\int_{\Omega}\nabla p_{2}^{n+1}\cdot\nabla q=\int_{\Omega}(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n})\cdot\nabla q\\
\int_{\Omega}p_{2}^{n+1}=0
$$
很容易验证$p^{n+1}=p_{1}^{n+1}+Sp_{2}^{n+1}$

利用$p^{n+1}=p_{1}^{n+1}+Sp_{2}^{n+1}$，则
$$
\frac{\rho}{\mu\Delta t}\mathbf{u}^{n+1}-\Delta\mathbf{u^{n+1}}=\frac{S}{\mu}(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n}-\nabla p^{n+1}_{2})+(\frac{\rho}{\mu\Delta t}\mathbf{u}^{n}-\frac{1}{\mu}\nabla p_{1}^{n+1})\\
$$
令$\phi$是任意测试函数，且$\phi|_{\Omega}=0$,对上述关于$\phi$做$L^{2}$内积，
$$
\frac{\rho}{\mu\Delta t}\int_{\Omega}\mathbf{u}^{n+1}\phi+\int_{\Omega}\nabla\phi\cdot\nabla\mathbf{u^{n+1}}=\frac{S}{\mu}\int_{\Omega}(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n}-\nabla p^{n+1}_{2})\phi+\int_{\Omega}(\frac{\rho}{\mu\Delta t}\mathbf{u}^{n}-\frac{1}{\mu}\nabla p_{1}^{n+1})\phi
$$
上式可求$\mathbf{u}^{n+1}$

如何求解$\mathbf{u}^{n+1}$

1）对于$\mathbf{u}^{n+1}_{1}$:
$$
\frac{\rho}{\mu\Delta t}\int_{\Omega}\mathbf{u}_{1}^{n+1}\phi+\int_{\Omega}\nabla\phi\cdot\nabla\mathbf{u}_{1}^{n+1}=\int_{\Omega}(\frac{\rho}{\mu\Delta t}\mathbf{u}^{n}-\frac{1}{\mu}\nabla p_{1}^{n+1})\phi\\
\mathbf{u}_{1}^{n+1}=\mathbf{w}^{n+1}
$$
1）对于$\mathbf{u}^{n+1}_{2}$:
$$
\frac{\rho}{\mu\Delta t}\int_{\Omega}\mathbf{u}_{2}^{n+1}\phi+\int_{\Omega}\nabla\phi\cdot\nabla\mathbf{u}_{2}^{n+1}=\frac{1}{\mu}\int_{\Omega}(f^{n}-\rho\mathbf{u}^{n}\cdot\nabla \mathbf{u}^{n}-\nabla p^{n+1}_{2})\phi\\
\mathbf{u}_{1}^{n+1}=0
$$
很容易验证$\mathbf{u}^{n+1}=\mathbf{u}_{1}^{n+1}+S\mathbf{u}_{2}^{n+1}$
$$
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})=-\mu\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}+\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{w}^{n+1}-\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p^{n+1}\\
-\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})|\mathbf{w}^{n+1}|^{2}
$$
上述方程两边同时乘以$\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}$则
$$
2q^{n+1}(\frac{q^{n+1}-q^{n}}{\Delta t})\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}=-\mu\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\int_{\Omega}|\nabla\mathbf{u}^{n+1}|^{2}+\mu\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}^{n+1})\cdot\mathbf{w}^{n+1}-\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p^{n+1}\\
-\frac{q^{n+1}}{\sqrt{E(\bar{t})+\delta}}\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})|\mathbf{w}^{n+1}|^{2}\\
$$
则
$$
\frac{2}{\Delta t}S^{3}(E(\bar{t})+\delta)-\frac{2 q^{n}}{\Delta t}S^{2}\sqrt{E(\bar{t})+\delta}+A_{1}S+A_{2}S^{2}+A_{3}S^{3}=0\\
A_{1}= \mu\int_{\Omega}|\nabla\mathbf{u}_{1}^{n+1}|^{2}-\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}_{1}^{n+1})\cdot\mathbf{w}^{n+1}+\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p_{1}^{n+1}+\frac{\rho}{2}\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})|\mathbf{w}^{n+1}|^{2}\\
A_{2}=2\mu\int_{\Omega}\nabla \mathbf{u}^{n+1}_{1}:\nabla \mathbf{u}^{n+1}_{2}-\mu\int_{\partial\Omega}(\mathbf{n}\cdot\nabla\mathbf{u}_{2}^{n+1})\cdot\mathbf{w}^{n+1}+\int_{\partial\Omega}(\mathbf{n}\cdot\mathbf{w}^{n+1})p_{2}^{n+1} \\
A_{3}=\mu\int_{\Omega}|\nabla\mathbf{u}_{2}^{n+1}|^{2}
$$
