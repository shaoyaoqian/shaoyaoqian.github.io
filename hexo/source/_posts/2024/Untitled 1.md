---
abbrlink: 2
---

Hello gmsh Users,

This is a question about modelling 2D surfaces with arbitrary shapes and sharp angles within the geometry.
The mesh is then used by a radiation-diffraction solver to obtain the hydrodynamic potential.
It is a specific application to a ship hull but must be similar to many other applications.

So we are using gmsh to create a 2D structured mesh of a ship hull with a geometry looking like the one below (note the appendage in red):
[cid:image002.png at 01D64612.18B06F60][cid:image004.png at 01D64612.18B06F60][cid:image005.png at 01D64612.18B06F60]

Meshing the overall hull shape has been fairly straightforward and gmsh did exactly what we expected, yielding a good quality mesh with minimal efforts. We created my 3 and 4 edges surfaces from lines and B-Splines curves. For each surface, we defined Transfinite Curves, Surfaces and Recombined each surface them to get the 2D Structured Mesh:
[cid:image006.jpg at 01D64612.18B06F60]

The issue is related to the appendage on the stern of the hull (called "skeg") as shown on the first picture. If we include this as the same surface as the hull, the sharp angle would never be captured by the B-spline.

So far we have tried a couple of things based on processes commonly applied in other packages:
First we have made a contour of the skeg using B-splines and lines (Line 16, Line 17, Line 18, Nurb 12, Nurb 13) and split the forward B-spline into 2 (Nurb 7 and Nurb 8)  as shown below.
[cid:image007.jpg at 01D64612.18B06F60]
This has either resulted in endless loops of "Warning: Wrong control point index in bspline" or in meshing errors in the appendage and surrounding regions.

Next we have tried to approximate the contour of the skeg with Nurb 17 to generate Surface 2 (made of Nurbs 7,8,5,17) and then add 3 separate lines to produce the side surface of the skeg (Surface 5 made of Nurb 14, 15 and Line 16)
[cid:image008.jpg at 01D64612.18B06F60]
This resulted in an error message and the Surface 5 meshed with 1 element only as shown above.

Have you got any suggestion on how one should proceed to get a 2D structured mesh of such a geometry with sharp angles (here, the hull and the skeg) and capture those discontinuities within the mesh, as depicted in the first figure?
