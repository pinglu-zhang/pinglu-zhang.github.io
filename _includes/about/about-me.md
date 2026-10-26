{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
# 🙋🏼 About Me
{: id="about-me"}
I am Pinglu Zhang, a PhD student in Computer Science and Technology at the [Institute of Fundamental and Frontier Sciences](https://www.iffs.uestc.edu.cn/), [University of Electronic Science and Technology of China (UESTC)](https://www.uestc.edu.cn), supervised by [Prof. Quan Zou](http://lab.malab.cn/~zq/). I am also undertaking joint doctoral training at [Zhongguancun Academy](https://www.bjzgca.edu.cn/).

At the [Malab laboratory](http://123.57.240.48/forum.php?mod=viewthread&tid=8672), I work on [sequence alignment](http://lab.malab.cn/~cjt/MSA/), with a focus on large-scale multiple sequence alignment, multiple-genome alignment, and centromeric sequence alignment. <a href='https://scholar.google.com/citations?user=T70BtHMAAAAJ&hl=en'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations" alt="Google Scholar citations"></a>

For research discussions or collaboration, please contact me at [**zpl010720@gmail.com**](mailto:zpl010720@gmail.com).

[**Download CV (PDF)**]({{ '/cv/Pinglu_Zhang_Academic_CV.pdf' | relative_url }})
