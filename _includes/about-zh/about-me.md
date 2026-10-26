{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
# 🙋🏼 关于我
我是张平路，[电子科技大学](https://www.uestc.edu.cn)[基础与前沿研究院](https://www.iffs.uestc.edu.cn/)计算机科学与技术专业博士研究生，师从[邹权教授](http://lab.malab.cn/~zq/)。目前在[北京中关村学院](https://www.bjzgca.edu.cn/)联合培养。

我在 [Malab 实验室](http://123.57.240.48/forum.php?mod=viewthread&tid=8672)从事[序列比对](http://lab.malab.cn/~cjt/MSA/)研究，主要关注大规模多序列比对、多基因组比对和着丝粒区域比对。 <a href='https://scholar.google.com/citations?user=T70BtHMAAAAJ&hl=zh-CN'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=%E5%BC%95%E7%94%A8%E6%AC%A1%E6%95%B0" alt="Google Scholar 引用次数"></a>

欢迎交流与合作，邮箱：[**zpl010720@gmail.com**](mailto:zpl010720@gmail.com)。

[**下载英文简历（PDF）**]({{ '/cv/Pinglu_Zhang_Academic_CV.pdf' | relative_url }})
