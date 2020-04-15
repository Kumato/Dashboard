<template>
  <div class="text">
    <Alert />
    <h1>Welcome to S10 general purpose computing platform for big data</h1>
    <p>
      We are currently having 3 of 9 servers open for running computing tasks.
      Each server has 24 threads CPU and 256 GiB RAM.
      One of these servers has one Quadro P4000 Graphic card,
      which enables ability to run NVIDIA <el-link href="//developer.nvidia.com/cuda-zone">
      CUDA</el-link>
      (Compute Unified Device Architecture)
      and <el-link href="//developer.nvidia.com/cudnn">cuDNN</el-link>
      (CUDA Deep Neural Network library) computations.
    </p>
    <p>
      You are encouraged to run GPU-based tasks and multi-threads
      tasks on these servers. Just be aware these servers have low processor frequency,
      which means they are not suitable for running single thread tasks.
      If you do want to run single thread tasks, you may want to specify a small number (e.g. 1)
      on processor section in new task form.
    </p>
    <h3>Getting Started</h3>
    <p>
      It is assumed you have basic knowledge on POSIX shell script, and can compile/run program via
      command line instead of clicking button on IDE.
    </p>
    <p>
      A new task starts from executing an entry point script.
      All you need to do is writing a POSIX shell script named
      <code>AUTORUN.sh</code>. Put the script inside your project folder, followed by compress
      project folder as .zip archive. You are now ready to create a new task.
    </p>
    <p>
      For example, if you have a simple Java program called <code>HelloWorld.java</code>.
      The content of Java source code file <code>HelloWorld.java</code> might be looked like this:
    </p>
    <pre class="chroma"><span class="kd">public</span> <span class="kd">class</span> <span
      class="nc">HelloWorld</span> <span class="o">{</span>

    <span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span
        class="nf">main</span><span class="o">(</span><span
        class="n">String</span><span class="o">[]</span> <span
        class="n">args</span><span class="o">)</span> <span class="o">{</span>
        <span class="c1">// Prints &#34;Hello, World&#34; to the terminal window.</span>
        <span class="c1"></span> <span class="n">System</span><span class="o">.</span><span
        class="na">out</span><span class="o">.</span><span
        class="na">println</span><span class="o">(</span><span
        class="s">&#34;Hello, World&#34;</span><span class="o">);</span>
    <span class="o">}</span>

<span class="o">}</span></pre>
    <p>Your <code>AUTORUN.sh</code> may be similar as this:</p>
    <pre class="chroma"><span class="cp">#!/bin/bash
</span><span class="cp"></span>
<span class="c1"># Project archive is extracted in directory /BUILD.</span>
<span class="c1"># This directory is also set as environment variable AUTORUN_BUILD</span>
<span class="c1">#</span>
<span
  class="c1"># Compile HelloWorld.class that contains the bytecode version of the program.</span>
<span class="c1"># Use either javac /BUILD/MyProject/HelloWorld.java, or</span>
javac <span class="si">${</span><span class="nv">AUTORUN_BUILD</span><span
        class="si">}</span>/MyProject/HelloWorld.java

<span class="c1"># Execute the program.</span>
<span class="c1"># This will print “Hello World” to the terminal screen.</span>
<span class="c1"
># Use either java -cp /BUILD/MyProject/ HelloWorld, or</span>
java -cp <span class="si">${</span><span class="nv">AUTORUN_BUILD</span><span
        class="si">}</span>/MyProject/ HelloWorld

<span class="c1"># Directory /RESULT will be archived once this script finished.</span>
<span class="c1"># This directory is also set as environment variable AUTORUN_RESULT</span>
<span class="c1"
># You can access result archive and standard outputs (as logs) in task detail website page.</span>
<span class="c1">#</span>
<span class="c1"
># Write program results data into AUTORUN_RESULT directory for later access.</span>
<span class="c1"
># Use either java -cp ${AUTORUN_BUILD}/MyProject/ HelloWorld &gt;&gt; /RESULT/result.log, or</span>
java -cp <span class="si">${</span><span class="nv">AUTORUN_BUILD</span><span
        class="si">}</span>/MyProject/ HelloWorld &gt;&gt; /<span
        class="si">${</span><span class="nv">AUTORUN_RESULT</span><span
        class="si">}</span>/result.log</pre>
    Thus, your project folder should contain following files:
    <pre class="chroma"><span class="p">|</span>-- MyProject
    <span class="p">|</span>-- HelloWorld.java
    <span class="p">|</span>-- AUTORUN.sh</pre>
    <p>
      Now, compress MyProject folder to <code>MyProject.zip</code>.
      You will need to upload <code>MyProject.zip</code>
      when filling the new task form and submitting new task request.
    </p>
    <p>
      All tasks are performed in GNU/Linux environment.
      Please be careful some shell commands from UNIX (e.g. macOS, freeBSD) environments may not
      compatible on GNU/Linux. You may find them on task log, if you experience these errors.
    </p>
    <h3>FAQ</h3>
    <el-collapse>
      <el-collapse-item
        title="What programming language or computation platform is supported?" name="1">
        <div>
          The following environments are currently supported:
          <ul>
            <li>CUDA: SDK and runtime</li>
            <li>Java standard edition (JDK) <br>
              *If you use Java SE, it is assumed you have agreed
              <el-link
                href="//www.oracle.com/downloads/licenses/javase-license1.html#licenseContent">
                Oracle Technology Network License Agreement for Oracle Java SE
              </el-link>
              .
            </li>
          </ul>
          These environments are built upon
          <el-link href="//www.redhat.com/en/blog/introducing-red-hat-universal-base-image">
            Red Hat Universal Base Image.
          </el-link>
          Please let administer know if you have other environments demand.
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="Why there is no internet access when running computation tasks?" name="2">
        <div>
          There is no internet access for servers. But they do have local area network access to
          other computers in QUT network because these servers are physically located in S Block.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';

export default {
  name: 'Home',
  components: { Alert },
  comments: {
    Alert,
  },
  methods: {
    open(url) {
      window.open(url);
    },
  },
};
</script>

<style scoped>
  .text {
    text-align: justify;
  }

  h3,
  strong {
    margin-top: 32px;
  }

  pre,
  code {
    background: #f3f2f1;
    font-size: 13px;
    font-family: 'Roboto Mono', monospace;
  }

  pre {
    padding: 10px;
    width: 100%;
    overflow: auto;
  }

  /* Error */
  .chroma .err {
    color: #a61717;
    background-color: #e3d2d2;
  }

  /* LineTableTD */
  .chroma .lntd {
    vertical-align: top;
    padding: 0;
    margin: 0;
    border: 0;
  }

  /* LineTable */
  .chroma .lntable {
    border-spacing: 0;
    padding: 0;
    margin: 0;
    border: 0;
    width: auto;
    overflow: auto;
    display: block;
  }

  /* LineHighlight */
  .chroma .hl {
    display: block;
    width: 100%;
    background-color: #e5e5e5
  }

  /* LineNumbersTable */
  .chroma .lnt {
    margin-right: 0.4em;
    padding: 0 0.4em 0 0.4em;
    color: #7f7f7f
  }

  /* LineNumbers */
  .chroma .ln {
    margin-right: 0.4em;
    padding: 0 0.4em 0 0.4em;
    color: #7f7f7f
  }

  /* Keyword */
  .chroma .k {
    color: #000000;
    font-weight: bold
  }

  /* KeywordConstant */
  .chroma .kc {
    color: #000000;
    font-weight: bold
  }

  /* KeywordDeclaration */
  .chroma .kd {
    color: #000000;
    font-weight: bold
  }

  /* KeywordNamespace */
  .chroma .kn {
    color: #000000;
    font-weight: bold
  }

  /* KeywordPseudo */
  .chroma .kp {
    color: #000000;
    font-weight: bold
  }

  /* KeywordReserved */
  .chroma .kr {
    color: #000000;
    font-weight: bold
  }

  /* KeywordType */
  .chroma .kt {
    color: #445588;
    font-weight: bold
  }

  /* NameAttribute */
  .chroma .na {
    color: #008080
  }

  /* NameBuiltin */
  .chroma .nb {
    color: #0086b3
  }

  /* NameBuiltinPseudo */
  .chroma .bp {
    color: #999999
  }

  /* NameClass */
  .chroma .nc {
    color: #445588;
    font-weight: bold
  }

  /* NameConstant */
  .chroma .no {
    color: #008080
  }

  /* NameDecorator */
  .chroma .nd {
    color: #3c5d5d;
    font-weight: bold
  }

  /* NameEntity */
  .chroma .ni {
    color: #800080
  }

  /* NameException */
  .chroma .ne {
    color: #990000;
    font-weight: bold
  }

  /* NameFunction */
  .chroma .nf {
    color: #990000;
    font-weight: bold
  }

  /* NameLabel */
  .chroma .nl {
    color: #990000;
    font-weight: bold
  }

  /* NameNamespace */
  .chroma .nn {
    color: #555555
  }

  /* NameTag */
  .chroma .nt {
    color: #000080
  }

  /* NameVariable */
  .chroma .nv {
    color: #008080
  }

  /* NameVariableClass */
  .chroma .vc {
    color: #008080
  }

  /* NameVariableGlobal */
  .chroma .vg {
    color: #008080
  }

  /* NameVariableInstance */
  .chroma .vi {
    color: #008080
  }

  /* LiteralString */
  .chroma .s {
    color: #dd1144
  }

  /* LiteralStringAffix */
  .chroma .sa {
    color: #dd1144
  }

  /* LiteralStringBacktick */
  .chroma .sb {
    color: #dd1144
  }

  /* LiteralStringChar */
  .chroma .sc {
    color: #dd1144
  }

  /* LiteralStringDelimiter */
  .chroma .dl {
    color: #dd1144
  }

  /* LiteralStringDoc */
  .chroma .sd {
    color: #dd1144
  }

  /* LiteralStringDouble */
  .chroma .s2 {
    color: #dd1144
  }

  /* LiteralStringEscape */
  .chroma .se {
    color: #dd1144
  }

  /* LiteralStringHeredoc */
  .chroma .sh {
    color: #dd1144
  }

  /* LiteralStringInterpol */
  .chroma .si {
    color: #dd1144
  }

  /* LiteralStringOther */
  .chroma .sx {
    color: #dd1144
  }

  /* LiteralStringRegex */
  .chroma .sr {
    color: #009926
  }

  /* LiteralStringSingle */
  .chroma .s1 {
    color: #dd1144
  }

  /* LiteralStringSymbol */
  .chroma .ss {
    color: #990073
  }

  /* LiteralNumber */
  .chroma .m {
    color: #009999
  }

  /* LiteralNumberBin */
  .chroma .mb {
    color: #009999
  }

  /* LiteralNumberFloat */
  .chroma .mf {
    color: #009999
  }

  /* LiteralNumberHex */
  .chroma .mh {
    color: #009999
  }

  /* LiteralNumberInteger */
  .chroma .mi {
    color: #009999
  }

  /* LiteralNumberIntegerLong */
  .chroma .il {
    color: #009999
  }

  /* LiteralNumberOct */
  .chroma .mo {
    color: #009999
  }

  /* Operator */
  .chroma .o {
    color: #000000;
    font-weight: bold
  }

  /* OperatorWord */
  .chroma .ow {
    color: #000000;
    font-weight: bold
  }

  /* Comment */
  .chroma .c {
    color: #999988;
    font-style: italic
  }

  /* CommentHashbang */
  .chroma .ch {
    color: #999988;
    font-style: italic
  }

  /* CommentMultiline */
  .chroma .cm {
    color: #999988;
    font-style: italic
  }

  /* CommentSingle */
  .chroma .c1 {
    color: #999988;
    font-style: italic
  }

  /* CommentSpecial */
  .chroma .cs {
    color: #999999;
    font-weight: bold;
    font-style: italic
  }

  /* CommentPreproc */
  .chroma .cp {
    color: #999999;
    font-weight: bold;
    font-style: italic
  }

  /* CommentPreprocFile */
  .chroma .cpf {
    color: #999999;
    font-weight: bold;
    font-style: italic
  }

  /* GenericDeleted */
  .chroma .gd {
    color: #000000;
    background-color: #ffdddd
  }

  /* GenericEmph */
  .chroma .ge {
    color: #000000;
    font-style: italic
  }

  /* GenericError */
  .chroma .gr {
    color: #aa0000
  }

  /* GenericHeading */
  .chroma .gh {
    color: #999999
  }

  /* GenericInserted */
  .chroma .gi {
    color: #000000;
    background-color: #ddffdd
  }

  /* GenericOutput */
  .chroma .go {
    color: #888888
  }

  /* GenericPrompt */
  .chroma .gp {
    color: #555555
  }

  /* GenericStrong */
  .chroma .gs {
    font-weight: bold
  }

  /* GenericSubheading */
  .chroma .gu {
    color: #aaaaaa
  }

  /* GenericTraceback */
  .chroma .gt {
    color: #aa0000
  }

  /* GenericUnderline */
  .chroma .gl {
    text-decoration: underline
  }

  /* TextWhitespace */
  .chroma .w {
    color: #bbbbbb
  }
</style>
