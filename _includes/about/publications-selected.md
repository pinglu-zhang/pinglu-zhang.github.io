# 📝 {{ ui.publications }}
{: id="-publications"}


<div class='paper-box'>  
  <div class='paper-box-image'>  
    <div>  
      <div class="badge">Genome Biology 2025</div>  
      <img src="{{ '/images/halign-g.png' | relative_url }}" alt="sym" width="90%">
    </div>  
  </div>  
  <div class='paper-box-text' markdown="1">  

[HAlign-G: rapid and low-memory multiple-genome aligner for large-scale closely related genomes](https://doi.org/10.1186/s13059-025-03881-3)

**Pinglu Zhang**<sup>†</sup>, Tong Zhou<sup>†</sup>, Yanming Wei, Qinzhong Tian, Yixiao Zhai, Yizheng Wang, Quan Zou, Furong Tang\*, Ximei Luo\*

**Genome Biology, 2025, {{ ui.cas_zone_1 }}, IF2025=9.4**

<span class="publication-actions" markdown="span">[{{ ui.paper }}](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/HAlign-G.pdf) [{{ ui.code }}](https://github.com/malabz/HAlign-G) <span class='show_paper_citations' data='T70BtHMAAAAJ:Y0pCki6q_DkC'></span></span>

{% if page.lang == 'zh' %}
{% include about-zh/halign-g-description.md %}
{% else %}
- HAlign-G is a fast and memory-efficient solution for large-scale multiple genome alignment, integrating BWT-FM-LIS indexing, an optimized K-band algorithm, and a star-alignment strategy.

- It includes HAlign-G1 for intra-species multiple sequence alignment and HAlign-G2 for cross-species multiple genome alignment, each optimized for distinct evolutionary signals.

- Benchmarks indicate that HAlign-G achieves higher accuracy, lower memory usage, and significantly faster performance than existing methods across both short- and long-genome datasets.
{% endif %}

</div>  
</div>  

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Genome Research 2025</div>
      <img src="{{ '/images/RaMA.svg' | relative_url }}" alt="sym" width="90%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">

[Fast sequence alignment for centromere with RaMA](https://doi.org/10.1101/gr.279763.124)

**Pinglu Zhang**, Yanming Wei, Qinzhong Tian, Quan Zou, Yansu Wang\*

**Genome Research, 2025, {{ ui.cas_zone_1 }}, nature index journal, IF2024=6.24.**

<span class="publication-actions" markdown="span">[{{ ui.paper }}](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/RaMA.pdf) [{{ ui.code }}](https://github.com/pinglu-zhang/RaMA) <span class='show_paper_citations' data='T70BtHMAAAAJ:qjMakFHDy7sC'></span></span>

{% if page.lang == 'zh' %}
{% include about-zh/rama-description.md %}
{% else %}
- RaMA is a novel sequence alignment tool designed for centromeric regions, leveraging rare matches as anchors and a 2-piece affine gap cost to capture genetic evolution accurately.
- RaMA utilizes parallel computing and the wavefront algorithm, achieving up to 13.66 times faster processing and using only 11% of UniAligner's memory.
- Additionally, RaMA introduces two innovative methods for defining reliable alignment regions, which further refine the accuracy of centromeric alignment statistics and provide more robust insights into genetic variations.
- Downstream analysis of simulated data and HOR arrays demonstrates RaMA's superior accuracy in capturing true HOR structures and defining reliable alignment regions.
{% endif %}

</div>
</div>


<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Bioinformatics 2024</div>
      <img src="{{ '/images/FMAlign2.png' | relative_url }}" alt="sym" width="90%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">

[FMAlign2: a novel fast multiple nucleotide sequence alignment method for ultralong datasets](https://academic.oup.com/bioinformatics/advance-article/doi/10.1093/bioinformatics/btae014/7515251)

**Pinglu Zhang**, Huan Liu, Yanming Wei, Yixiao Zhai, Qinzhong Tian, Quan Zou\*

**Bioinformatics, 2024, {{ ui.cas_zone_3 }}, CCF-B, IF2024=4.4.**

<span class="publication-actions" markdown="span">[{{ ui.paper }}](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/FMAlign2.pdf) [{{ ui.code }}](https://github.com/malabz/FMAlign2) <span class='show_paper_citations' data='T70BtHMAAAAJ:u-x6o8ySG0sC'></span></span>

{% if page.lang == 'zh' %}
{% include about-zh/fmalign2-description.md %}
{% else %}
- FMAlign2 is an improved MSA method that uses a suffix array and vertical division strategy to align ultralong sequences in parallel. 
- FMAlign2 reduces processing time while maintaining accuracy, handling sequences up to billions in length efficiently.
{% endif %}

</div>
</div>
