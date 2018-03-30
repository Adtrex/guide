webpackJsonp([0xc79ea1242e7db800],{"./node_modules/json-loader/index.js!./.cache/json/data-science-tools-flink-batch-examples-java.json":function(e,n){e.exports={data:{markdownRemark:{html:'<h2>Flink Batch Example JAVA</h2>\n<p>Apache Flink is an open source stream processing framework with powerful stream- and batch-processing capabilities.</p>\n<h3>Prerequisites</h3>\n<ul>\n<li>Unix-like environment (Linux, Mac OS X, Cygwin)</li>\n<li>git</li>\n<li>Maven (we recommend version 3.0.4)</li>\n<li>Java 7 or 8</li>\n<li>IntelliJ IDEA or Eclipse IDE</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>git clone https://github.com/apache/flink.git\ncd flink\nmvn clean package -DskipTests # this will take up to 10 minutes</code></pre>\n      </div>\n<h3>Datasets</h3>\n<p>For the batch processing data we’ll be using the datasets in here: <a href="http://files.grouplens.org/datasets/movielens/ml-latest-small.zip">datasets</a>\nIn this example we’ll be using the movies.csv and the ratings.csv, create a new java project and put them in a folder in the application base.</p>\n<h3>Example</h3>\n<p>We’re going to make an execution where we retrieve the average rating by movie genre of the entire dataset we have. </p>\n<p><strong>Environment and datasets</strong></p>\n<p>First create a new Java file, I’m going to name it AverageRating.java</p>\n<p>The first thing we’ll do is to create the execution environment and load the csv files in a dataset. Like this: </p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();\nDataSet<Tuple3<Long, String, String>> movies = env.readCsvFile("ml-latest-small/movies.csv")\n  .ignoreFirstLine()\n  .parseQuotedStrings(\'"\')\n  .ignoreInvalidLines()\n  .types(Long.class, String.class, String.class);\n\nDataSet<Tuple2<Long, Double>> ratings = env.readCsvFile("ml-latest-small/ratings.csv")\n  .ignoreFirstLine()\n  .includeFields(false, true, true, false)\n  .types(Long.class, Double.class);</code></pre>\n      </div>\n<p>There, we are making a dataset with a &#x3C;Long, String, String> for the movies, ignoring errors, quotes and the header line, and a dataset with &#x3C;Long, Double> for the movie ratings, also ignoring the header, invalid lines and quotes.</p>\n<p><strong>Flink Processing</strong></p>\n<p>Here we will process the dataset with flink. The result will be in a List of String, Double tuples. where the genre will be in the String and the average rating will be in the double.</p>\n<p>First we’ll join the ratings dataset with the movies dataset by the moviesId present in each dataset.\nWith this we’ll create a new Tuple  with the movie name, genre and score.\nLater, we group this tuple by genre and add the score of all equal genres, finally we divide the score by the total results and we have our desired result. </p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>List<Tuple2<String, Double>> distribution = movies.join(ratings)\n  .where(0)\n  .equalTo(0)\n  .with(new JoinFunction<Tuple3<Long, String, String>,Tuple2<Long, Double>, Tuple3<StringValue, StringValue, DoubleValue>>() {\n    private StringValue name = new StringValue();\n    private StringValue genre = new StringValue();\n    private DoubleValue score = new DoubleValue();\n    private Tuple3<StringValue, StringValue, DoubleValue> result = new Tuple3<>(name,genre,score);\n\n    @Override\n    public Tuple3<StringValue, StringValue, DoubleValue> join(Tuple3<Long, String, String> movie,Tuple2<Long, Double> rating) throws Exception {\n      name.setValue(movie.f1);\n      genre.setValue(movie.f2.split("\\\\|")[0]);\n      score.setValue(rating.f1);\n      return result;\n    }\n})\n  .groupBy(1)\n  .reduceGroup(new GroupReduceFunction<Tuple3<StringValue,StringValue,DoubleValue>, Tuple2<String, Double>>() {\n    @Override\n    public void reduce(Iterable<Tuple3<StringValue,StringValue,DoubleValue>> iterable, Collector<Tuple2<String, Double>> collector) throws Exception {\n      StringValue genre = null;\n      int count = 0;\n      double totalScore = 0;\n      for(Tuple3<StringValue,StringValue,DoubleValue> movie: iterable){\n        genre = movie.f1;\n        totalScore += movie.f2.getValue();\n        count++;\n      }\n\n      collector.collect(new Tuple2<>(genre.getValue(), totalScore/count));\n    }\n})\n  .collect();</code></pre>\n      </div>\n<p>With this you’ll have a working batch processing flink application. Enjoy!.</p>',fields:{slug:"/data-science-tools/flink/batch-examples-java/"},frontmatter:{title:"Flink Batch Example JAVA"}}},pathContext:{slug:"/data-science-tools/flink/batch-examples-java/"}}}});
//# sourceMappingURL=path---data-science-tools-flink-batch-examples-java-e9ef44a13df2201c312d.js.map