path = "C:/Users/JOHANPRO/Desktop/Top Stores/Paginas TOPSTORE/Catalogo/index.html"
f = open(path, "r", encoding="utf-8")
c = f.read()
f.close()
old = "MUJERES/Short-1-1.1.1.1.1.1/Short-1.1.1.1.1.1.1.1.1.1.1-2.1.1."
new = "MUJERES/Short-2-1.1."
count = c.count(old)
print("Found", count, "occurrences")
if count > 0:
    c = c.replace(old, new)
    f = open(path, "w", encoding="utf-8")
    f.write(c)
    f.close()
    print("Done")
else:
    print("Not found")