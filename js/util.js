
/**
 * Este archivo contiene una serie de utilidades escritas en ECMA Script, sin
 * utilizar elemntos propios del navegador, como el árbol DOM o las variables
 * del navegador.
 *
 * Todas las funciones y variables se añaden al objeto Util, que funciona como
 * un espacio de nombres (en algunos lenguajes de programación también se llaman
 * "paquetes" o "módulos").
 */

////////////////////////
// VARIABLES GLOBALES //
////////////////////////
toolsTarget = "main";


////////////////////////
// FUNCIONES GLOBALES //
////////////////////////

/**
 * Modifica el tipo Object para que contenga el método "create"
 */
if (typeof Object.create !== 'function') {
    /**
     * Crea un nuevo objeto del mismo tipo que el objeto pasado de parámetro
     * - o: Objeto cuyo tipo se usará para crear uno nuevo.
     */
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/**
 * Modifica el tipo Object para que contenga el método "clone"
 */
if (typeof Object.clone !== 'function') {
    /**
     * Crea una copia de un objeto y copia el valor de todos los campos para
     * obtener una copia idéntica del original.
     * 
     * - obj: Objeto a clonar
     */
    Object.clone = function (orig, copy)
    {
        // terminal state
        if (/number|string|boolean|undefined/.test(typeof orig) || null === orig) {
            return orig;
        }
        
        if ("undefined" === typeof copy) {
            copy = orig instanceof Array ? [] : {}; 
        }

        for (var key in orig) {
            if (orig !== orig[key]) {
                copy[key] = clone(orig[key]);
            }
        }
        return copy;
    };
}



////////////////
// UTILIDADES //
////////////////

/**
 * "Constructor" del módulo.
 */
function Util()
{
	alert("Por favor, no cree instancias de esta clase");
}

//
// Sistema de logging
//

/**
 * Se pueden Util.info(), Util.warn(), Util.error() para los mensajes
 * Si Util.alert es true y no hay consola de depuracion disponible, se usan alerts
 * Si Util.verbose es true, se puede usar además Util.debug()
 */

Util.alert = false; 
Util.verbose = false;
// Hay sistema de depuracion
if (console){
    if (console.info) {
        Util.info = console.info;
    }
    if (console.warn) {
        Util.warn = console.warn;
    }
    if (console.error) {
        Util.error = console.error;
    }
    if (Util.verbose && console.log) {
        Util.debug = console.log;
    }
}
// No hay sistema de depuración
if (!Util.info) {
    if (Util.alert) {
        Util.info = window.alert;
    }else{
        Util.info = function();
    }
}
if (!Util.warn) {
    if (Util.alert) {
        Util.warn = window.alert;
    }else{
        Util.warn = function();
    }
}
if (!Util.error) {
    if (Util.alert) {
        Util.error = window.alert;
    }else{
        Util.error = function();
    }
}
if (verbose && !Util.debug) {
    if (Util.alert) {
        Util.verbose = function() {
            window.alert;
        }
    }else{
        Util.verbose = function();
    }
}

//
// Métodos y funciones del módulo Util
//

/**
 * Esconde o muestra el componente indicado.
 *
 * - elementName: ID del elemento a esconder (generalmente es un div).
 * - span: Elemento span que cambia el nombre al pulsarlo.
 */
Util.showHide = function (elementName)
{
    var elemento = Util.g(elementName);
    if(!elemento){
        return;
    }
    
    //Alterna entre block y none para mostrar o no el <div/>
    if(elemento.style.display != "none"){
        elemento.style.display = "none";
    }else{
        elemento.style.display = "block";
    }
};

/**
 * Copiado de aNieto2k: permite extraer el valor de un parámetro de la URL
 *
 * - name: Nombre del parámetro
 */
Util.gup = function (name)
{
    var regexS = "[\?&]"+name+"=([^&#]*)";
    var regex = new RegExp ( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );

    if( results == null )
        return "";
    else
        return results[1];
};

/**
 * Utiliza una expresión regular para sustituir un patrón en el texto de un
 * elemento con el texto de otro elemento.
 * 
 * - regexpElementID: ID del elemento con la expresión regular.
 * - textElementID: ID del elemento con el texto.
 * - replaceElementID: ID del elemento con el texto a sustituir.
 * - resultElementID: ID del elemento.
 */
Util.replaceRegexp = function (regexpElementID, textElementID, replaceElementID, resultElementID)
{
    //Extrae los elementos a partir de su ID
    var eRegexp = document.getElementById(regexpElementID);
    var eTexto = document.getElementById(textElementID);
    var eSustitucion = document.getElementById(replaceElementID);
    var eResultado = document.getElementById(resultElementID);
    
    //Construye la expresión regular
    var re = new RegExp(eRegexp.value, "gm");

    eResultado.value = eTexto.value.replace(re, eSustitucion.value);
};

/**
 * Añade un nodo de texto a un contenedor con nodos de texto. Se utiliza para
 * concatenar texto dentro de un DIV.
 * 
 * - parentElementID: ID del elemento que contendrá al nodo.
 * - text: Texto del nodo
 */
Util.appendText = function (parentElementID, text)
{
    var nodoPadre = document.getElementById(parentElementID);
    var nodotext = document.createTextNode(text);

    nodoPadre.appendChild(nodotext);
    nodoPadre.normalize();
};

/**
 * Obtiene un elemento por su id
 * 
 * -id: ID del elemento
 */ 
Util.getElement = function (id)
{
    return document.getElementById(id);
};

/**
 * Obtiene el valor de un input o un textarea con el ID indicado.
 *
 * -id: ID del elemento
 */
Util.getValue = function (id)
{
    return getElement(id).value;
};

/**
 * Establece el valor del input o textarea con el ID indicado.
 *
 * -id: ID del elemento
 * -value: Nuevo valor del elemento
 */
Util.setValue = function (id, value)
{
    getElement(id).value = value;
};

/**
 * Obtiene un elemento por su id (nombre corto)
 * 
 * -id: ID del elemento
 */ 
Util.g = function(id)
{
    return document.getElementById(id);
};

/**
 * Obtiene el valor de un input o un textarea con el ID indicado (nombre corto).
 *
 * -id: ID del elemento
 */
Util.gv = function(id)
{
    return document.getElementById(id).value;
};

/**
 * Establece el valor del input o textarea con el ID indicado (nombre corto).
 *
 * -id: ID del elemento
 * -value: Nuevo valor del elemento
 */
Util.sv = function(id, value)
{
    document.getElementById(id).value = value;
};

/**
 * Añade una función al evento "onload". Este método puede llamarse repetidas
 * veces para añadir varias funciones al evento de carga de la página.
 * 
 * - func: Función a añadir al evento "onload"
 */
Util.addLoadEvent = function (func) {
    if (!window.onload || typeof window.onload != 'function') {
        window.onload = func;
    } else {
        var oldonload = window.onload.clone();
        window.onload = function() {
            oldonload();
            func();
        }
    }
};

/**
 * Devuelve un número aleatorio entero entre los dos indicados (ambos incluidos)
 * 
 * - lower: Mínimo número que deseamos que salga.
 * - upper: Máximo número que deseamos que salga.
 */
Util.randomBetween = function(lower, upper)
{
	var dif = upper - lower + 1;
	return Math.floor(Math.random()*dif + lower);
};


/**
 * Ejecuta la función pasada como parámetro y devuelve el número de milisegundos
 * que ha tardado en ejecutarse
 * 
 * - func: Función a ejecutar
 */
Util.time = function(func)
{
	var ini = (new Date()).getTime();
	func();
	var fin = (new Date()).getTime();
	return fin - ini;
};


////////////
// CLASES //
////////////

//
// Clase Util.StringBuffer
//

/**
 * Clase StringBuffer para emular el StringBuffer de Java y agilizar la
 * concatenación de cadenas de texto.
 */
Util.StringBuffer = function(str)
{
	//Array que contendrá las subcadenas
	this.buffer = new Array();

	//Si se pasa el argumento str, se utiliza como primera posición del buffer
	if(str != undefined){
		this.buffer[0] = str;
	}
};

/**
 * Método para añadir una nueva cadena al buffer.
 * - str: Cadena a añadir
 */
Util.StringBuffer.prototype.append = function(str){
    try {
        this.buffer.push(str);
    } catch(err) {
        
    }
};

/**
 * Devuelve la cadena de texto formada por la concatenación de todas las subcadenas.
 */
Util.StringBuffer.prototype.toString = function(){
	return this.buffer.join("");
};


//
// Clase Hashmap
//

/**
 * Objeto Hashmap para facilitar el tratamiento de hashmaps
 */
function Hashmap(object)
{
    if(object == undefined) {
        this.o = new Object();
    } else {
        this.o = object;
    }
}

/**
 * Comprueba si existe la clave
 */
Hashmap.prototype.hasKey = function(key)
{
    for(var i in this.o){
        if(i == key){
            return true;
        }
    }
    return false;
};


/**
 * Comprueba si existe el valor
 */
Hashmap.prototype.hasValue = function(value)
{
    for(var i in this.o){
        if(this.o[i] == value){
            return true;
        }
    }
    return false;
};

/**
 * Comprueba si existe el valor
 */
Hashmap.prototype.put = function(key, value)
{
    this.o[key] = value;
};

/**
 * Obtiene un valor con la clave indicada
 */
Hashmap.prototype.get = function(key)
{
    return this.o[key];
};

/**
 * Obtiene las claves del hashmap en un array. No tienen por qué
 * estar ordenadas
 */
Hashmap.prototype.getKeys = function()
{
    var a = new Array();
    var i = 0;
    for(var j in this.o) {
        a[i] = j;
        i++;
    }
    
    return a;
}

/**
 * Obtiene un array con los valores del hashmap. El orden de los valores puede ser
 * impredecible.
 */
Hashmap.prototype.getValues = function()
{
    var a = new Array();
    var i = 0;
    for(var j in this.o) {
        a[i] = this.get(j);
        i++;
    }
    return a;
};
