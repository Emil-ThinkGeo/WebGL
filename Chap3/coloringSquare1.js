"use strict";

var canvas;
var gl;

var theta = 1.0;
var thetaLoc;

var a;
var r;
var g;
var b;

var av = 1.0;
var rv = 0.0;
var gv = 1.0;
var bv = 0.0;

window.onload = function init() {
    document.getElementById("ac").onchange = function () {
        av = parseFloat(this.value);
        window.requestAnimFrame(render);
    }
    document.getElementById("rc").onchange = function () {
        rv = parseFloat(this.value);
        window.requestAnimFrame(render);

    }
    document.getElementById("gc").onchange = function () {
        gv = parseFloat(this.value);
        window.requestAnimFrame(render);

    }
    document.getElementById("bc").onchange = function () {
        bv = parseFloat(this.value);
        window.requestAnimFrame(render);
    }

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1, 0),
        vec2(0, -1)
    ];


    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    a = gl.getUniformLocation(program, "a");
    r = gl.getUniformLocation(program, "r");
    g = gl.getUniformLocation(program, "g");
    b = gl.getUniformLocation(program, "b");

    render();
};


function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(thetaLoc, theta);
    gl.uniform1f(a, av);
    gl.uniform1f(r, rv);
    gl.uniform1f(g, gv);
    gl.uniform1f(b, bv);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
