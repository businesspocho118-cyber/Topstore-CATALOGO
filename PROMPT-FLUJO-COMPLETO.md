# ============================================
# PROMPT COMPLETO: Sistema de Actualización del Catálogo TOPSTORE
# ============================================
# Este archivo es la referencia principal. Cuando el contexto se reinicie,
# lee este archivo + busca en Engram "catalogo-topstores" para recuperar todo.
# ============================================

---

## ⚠️ INSTRUCCIONES IMPORTANTES

### ESTE ASISTENTE DEBE:
- ✅ ESPERAR a que el usuario diga "trabaja", "actualiza", "procesa"
- ✅ Seguir EXACTAMENTE las reglas de rutas
- ✅ Solo actuar cuando el usuario lo autorize

### ESTE ASISTENTE NO DEBE:
- ❌ Hacer nada automáticamente al iniciar
- ❌ Modificar archivos sin autorización

---

## 📱 ESTRUCTURA DEL GOOGLE FORM

El formulario tiene estos campos (en orden en el CSV):
1. **Marca temporal** (automático)
2. **NOMBRE** (nombre de la prenda)
3. **Categoria** (vacío - decorativa)
4. **Links Drive** (vacío - decorativa)
5. **Precio** (vacío - decorativa)
6. **Detalles** (vacío - decorativa)
7. **Categoria** (CON VALOR: "hombres", "mujeres", "Buzos", etc.)
8. **Subcategoria** (nombre: "Buzo Hombre Sin Manga", "Camisa OWN IT", etc.)
9. **Colores** (separados por coma: "Negro, Blanco, Azul")
10. **Otra tarea** (si tiene contenido = MODIFICACIÓN, si vacío = NUEVA PRENDA)

### IMPORTANTE:
- **Obligatorios**: Categoria + Subcategoria
- **Opcionales**: Links, Precio, Detalles, Colores, Otra tarea
- Si "Otra tarea" tiene texto → es MODIFICACIÓN
- Si "Otra tarea" está vacío → es NUEVA PRENDA

---

## 📋 REGLAS DE CLASIFICACIÓN

### Detección de GÉNERO:
| Palabra en texto | Género |
|-----------------|--------|
| "hombre", "hombres", "workout" | HOMBRES |
| "mujer", "mujeres", "sencillas", "push up" | MUJERES |

### Mapeo a páginas HTML:

**HOMBRES:**
| Categoría Form | Página HTML |
|---------------|-------------|
| camisas, camisa, workout | HOMBRES/camisas-hombre.html |
| buzos, buzo | HOMBRES/buzos-hombre.html |
| chaquetas, chaqueta | HOMBRES/chaquetas-hombre.html |

**MUJERES:**
| Categoría Form | Página HTML |
|---------------|-------------|
| buzos, buzo | MUJERES/buzos.html |
| camisas, camisa | MUJERES/camisas-mujer.html |
| chaquetas, chaqueta | MUJERES/chaquetas.html |
| conjuntos, conjunto | MUJERES/conjuntos.html |
| enterizos, enterizo | MUJERES/enterizos.html |
| leggings, legging | MUJERES/leggings.html |
| medias, media | MUJERES/medias.html |
| shorts, short | MUJERES/shorts.html |
| tops, top | MUJERES/tops.html |

---

## 📦 FORMATO HTML DE PRODUCTOS

### Formato NUEVO (product-item con data-attributes):

```html
<div class="product-item" 
     data-product-id="short-push-v" 
     data-name="Short con Push Up corte en V" 
     data-description="Short con diseño de corte en V que estiliza las piernas. Efecto push up para un look favorecedor." 
     data-price="$32.99" 
     data-colors="Negro, Blanco, Gris">
    <h3 class="product-name">Short con Push Up corte en V</h3>
    <div class="product-image-container">
        <img src="Short-con-Push-Up-corte-en-V/Short-con-push-up-corte-en-V-1.jpg" alt="Short con Push Up corte en V">
        <button class="btn-ver-mas-detalle" onclick="openProductDetail('short-push-v')">
            <span>🔍</span> Ver más
        </button>
    </div>
    <div class="product-gallery-data" id="gallery-short-push-v">
        <div class="gallery-item" data-src="Short-con-Push-Up-corte-en-V/Short-con-push-up-corte-en-V-1.jpg" data-alt="Short con Push Up corte en V"></div>
        <div class="gallery-item" data-src="Short-con-Push-Up-corte-en-V/Short-con-push-up-corte-en-V-2.jpg" data-alt="Short con Push Up corte en V"></div>
    </div>
</div>
```

### Generación de product-id:
1. Minúsculas
2. Espacios → guiones
3. Sin caracteres especiales
4. Ejemplo: "Camisa OWN IT" → "camisa-own-it"

---

## 🔗 REGLAS DE RUTAS (CRÍTICAS)

### index.html (en raíz de Catalogo/)

```html
<!-- Rutas de HOMBRES - incluyen HOMBRES/ -->
<img src="HOMBRES/Camisas-Hombre/WORKOUT/imagen.jpg">

<!-- Rutas de MUJERES - incluyen MUJERES/ -->
<img src="MUJERES/Leggings/imagen.jpg">
```

**USA `../`** para CSS y JS:
```html
<link rel="stylesheet" href="css/styles.css">
```

---

### HOMBRES/*.html (dentro de HOMBRES/)

```html
<!-- Rutas de estilos: SÍ usa ../ -->
<link rel="stylesheet" href="../css/styles.css">

<!-- Imágenes: NO usa ../ (están dentro de HOMBRES/) -->
<img src="Camisas-Hombre/WORKOUT/imagen.jpg">
```

---

### MUJERES/*.html (dentro de MUJERES/)

```html
<!-- Rutas de estilos: SÍ usa ../ -->
<link rel="stylesheet" href="../css/styles.css">

<!-- Imágenes: NO usa ../ (están dentro de MUJERES/) -->
<img src="Leggings/imagen.jpg">
```

---

## ❌ ERRORES CRÍTICOS

1. **En HOMBRES/*.html**: NO pongas `../` en rutas de imágenes
   ```html
   <!-- ❌ INCORRECTO -->
   <img src="../Camisas-Hombre/WORKOUT/imagen.jpg">
   
   <!-- ✅ CORRECTO -->
   <img src="Camisas-Hombre/WORKOUT/imagen.jpg">
   ```

2. **En MUJERES/*.html**: NO pongas `../` en rutas de imágenes
   ```html
   <!-- ❌ INCORRECTO -->
   <img src="../Buzos/imagen.jpg">
   
   <!-- ✅ CORRECTO -->
   <img src="Buzos/imagen.jpg">
   ```

3. **En index.html**: SÍ usa las carpetas completas
   ```html
   <!-- ✅ CORRECTO -->
   <img src="HOMBRES/Camisas-Hombre/WORKOUT/imagen.jpg">
   <img src="MUJERES/Leggings/imagen.jpg">
   ```

---

## 💰 PRECIO

**⚠️ IMPORTANTE: SIEMPRE en COP (Pesos Colombianos)**

- Si el formulario tiene precio → usar ese valor en COP
- Si está vacío → usar **"$30.000"** (genérico)
- ❌ NUNCA usar USD como "$24.99"
- ✅ SIEMPRE usar formato COP: "$XX.000"

**EJEMPLO**: `$30.000` para todos los productos

---

## 🎨 COLORES

- Si hay colores en formulario → usar esos separados por coma
- Si está vacío → dejar atributo vacío: `data-colors=""`
- Ejemplo: `data-colors="Negro, Blanco, Azul"`

---

## 🔧 CÓMO AÑADIR NUEVAS PRENDAS

### NUEVA PRENDA (formato product-item):

**1. Crear HTML en la página correspondiente:**

```html
<div class="product-item" 
     data-product-id="nombre-generado" 
     data-name="Nombre Visible" 
     data-description="Descripción de la prenda." 
     data-price="$49.99" 
     data-colors="Negro, Blanco">
    <h3 class="product-name">Nombre Visible</h3>
    <div class="product-image-container">
        <img src="CARPETA/NOMBRE-1.jpg" alt="Nombre Visible">
        <button class="btn-ver-mas-detalle" onclick="openProductDetail('nombre-generado')">
            <span>🔍</span> Ver más
        </button>
    </div>
    <div class="product-gallery-data" id="gallery-nombre-generado">
        <div class="gallery-item" data-src="CARPETA/NOMBRE-1.jpg" data-alt="Nombre Visible"></div>
        <div class="gallery-item" data-src="CARPETA/NOMBRE-2.jpg" data-alt="Nombre Visible"></div>
    </div>
</div>
```

**2. Actualizar index.html - Preview Card:**

```html
<div class="preview-card">
    <img src="RUTA-COMPLETA/NOMBRE-1.jpg" alt="Nombre Visible" onclick="openModal(this)">
    <h3>Nombre Visible</h3>
    <a href="RUTA-PAGINA.html" class="btn-ver-mas">Ver colección →</a>
</div>
```

---

## 🔄 CÓMO MODIFICAR PRENDAS

El usuario llena "Otra tarea" en el formulario con instrucciones como:
- "Modifica el color blanco de esta prenda y ahora en vez de blanco que aparezca como azul"
- "Cambia el precio a $35"

**Pasos:**
1. Identificar la página HTML según categoría
2. Buscar el `product-item` con el `data-product-id` correspondiente
3. Modificar `data-colors` o `data-price` según la instrucción

### Ejemplo de modificación de color:

**ANTES:**
```html
<div class="product-item" data-colors="Negro, Blanco, Rosa">
```

**DESPUÉS:**
```html
<div class="product-item" data-colors="Negro, Azul, Rosa">
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
C:/Users/JOHANPRO/Desktop/Top Stores/Catalogo/
├── index.html                    ← Selector HOMBRES/MUJERES
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── HOMBRES/
│   ├── camisas-hombre.html
│   ├── buzos-hombre.html
│   ├── chaquetas-hombre.html
│   ├── Camisas-Hombre/
│   │   ├── WORKOUT/
│   │   ├── Camisa-OWN-IT/
│   │   └── Camisa-ALPHA/
│   └── Buzos/
│       ├── Buzo-Hombre-Sin-Manga/
│       └── Buzo-compresor/
└── MUJERES/
    ├── buzos.html
    ├── camisas-mujer.html
    ├── chaquetas.html
    ├── conjuntos.html
    ├── enterizos.html
    ├── leggings.html
    ├── medias.html
    ├── shorts.html
    ├── tops.html
    ├── Buzos/
    ├── Camisas-Mujer/
    ├── Chaquetas/
    ├── Conjuntos/
    ├── Enterizos/
    ├── Leggings/
    ├── Medias/
    ├── Short-con-Push-Up-corte-en-V/
    └── Tops/
```

---

## 📍 UBICACIONES IMPORTANTES

| Componente | Ruta |
|------------|------|
| Catálogo | `C:/Users/JOHANPRO/Desktop/Top Stores/Catalogo/` |
| Scripts | `C:/Users/JOHANPRO/telegram-asistente/` |
| Script principal | `C:/Users/JOHANPRO/telegram-asistente/procesar-tareas.js` |
| Registro | `C:/Users/JOHANPRO/telegram-asistente/tareas-procesadas.json` |
| Google Sheet | `1pRrg8o1N1uE5LhTH08rB6Nw8wnbGbCeTKGrQV0iz4A4` |
| Engram proyecto | `catalogo-topstores` |

---

## 🚀 FLUJO DE TRABAJO

### Cuando el usuario diga "trabaja":

1. **Ejecutar script**:
   ```bash
   cd C:/Users/JOHANPRO/telegram-asistente
   node procesar-tareas.js
   ```

2. **Script detecta automáticamente**:
   - Si "Otra tarea" tiene contenido → **MODIFICACIÓN**
   - Si "Otra tarea" está vacío → **NUEVA PRENDA**

3. **Para NUEVA PRENDA**:
   - Descargar imágenes
   - Crear HTML con formato `product-item`
   - Añadir preview-card en index.html
   - Usar precio "$49.99" si está vacío

4. **Para MODIFICACIÓN**:
   - Encontrar página HTML
   - Modificar `data-colors` o `data-price`
   - Mostrar qué se cambió

5. **Mostrar resumen** al usuario

---

## ❌ NUNCA HACER

1. ❌ NO cambiar `switchCategory('hombres')` o `switchCategory('mujeres')`
2. ❌ NO agregar `../` en rutas de imágenes dentro de HOMBRES/ o MUJERES/
3. ❌ NO cambiar el nombre TOPSTORE
4. ❌ NO modificar css/styles.css o js/script.js sin necesidad
5. ❌ NO procesar si el usuario no dice "trabaja" o "tareas"

---

## 💡 EJEMPLOS DE FORMULARIO

### Nueva prenda:
```
Categoria: mujer
Subcategoria: Top alto escote en V
Links: link1, link2, link3
Precio: 35000
Colores: Negro, Blanco, Azul
Otra tarea: (vacío)
```

### Modificación:
```
Categoria: hombre
Subcategoria: Chaquetas
Links: (vacío)
Precio: (vacío)
Colores: (vacío)
Otra tarea: Modifica el color blanco de esta prenda y ahora en vez de blanco que aparezca como azul
```
