# 📝 Publications 
## Sequence Alignment


<div class='paper-box'>  
  <div class='paper-box-image'>  
    <div>  
      <div class="badge">Genome Biology 2025</div>  
      <img src='images/halign-g.png' alt="sym" width="90%">  
    </div>  
  </div>  
  <div class='paper-box-text' markdown="1">  

[HAlign-G: rapid and low-memory multiple-genome aligner for large-scale closely related genomes](https://doi.org/10.1186/s13059-025-03881-3)

**Pinglu Zhang**<sup>†</sup>, Tong Zhou<sup>†</sup>, Yanming Wei, Qinzhong Tian, Yixiao Zhai, Yizheng Wang, Quan Zou, Furong Tang\*, Ximei Luo\*

**Genome Biology, 2025, 中科院1区, IF2025=9.4**

[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/HAlign-G.pdf)   [**Code**](https://github.com/malabz/HAlign-G)   <strong><span class='show_paper_citations' data='T70BtHMAAAAJ:Y0pCki6q_DkC'></span></strong>

- HAlign-G is a fast and memory-efficient solution for large-scale multiple genome alignment, integrating BWT-FM-LIS indexing, an optimized K-band algorithm, and a star-alignment strategy.

- It includes HAlign-G1 for intra-species multiple sequence alignment and HAlign-G2 for cross-species multiple genome alignment, each optimized for distinct evolutionary signals.

- Benchmarks indicate that HAlign-G achieves higher accuracy, lower memory usage, and significantly faster performance than existing methods across both short- and long-genome datasets.

</div>  
</div>  

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Genome Research 2025</div>
      <img src='images/RaMA.svg' alt="sym" width="90%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">

[Fast sequence alignment for centromere with RaMA](https://doi.org/10.1101/gr.279763.124)

**Pinglu Zhang**, Yanming Wei, Qinzhong Tian, Quan Zou, Yansu Wang\*

**Genome Research, 2025, 中科院1区, nature index journal, IF2024=6.24.** 

[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/RaMA.pdf)&nbsp;&nbsp;[**Code**](https://github.com/pinglu-zhang/RaMA)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:qjMakFHDy7sC'></span></strong>

- RaMA is a novel sequence alignment tool designed for centromeric regions, leveraging rare matches as anchors and a 2-piece affine gap cost to capture genetic evolution accurately.
- RaMA utilizes parallel computing and the wavefront algorithm, achieving up to 13.66 times faster processing and using only 11% of UniAligner's memory.
- Additionally, RaMA introduces two innovative methods for defining reliable alignment regions, which further refine the accuracy of centromeric alignment statistics and provide more robust insights into genetic variations.
- Downstream analysis of simulated data and HOR arrays demonstrates RaMA's superior accuracy in capturing true HOR structures and defining reliable alignment regions.

</div>
</div>


<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Bioinformatics 2024</div>
      <img src='images/FMAlign2.png' alt="sym" width="90%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">

[FMAlign2: a novel fast multiple nucleotide sequence alignment method for ultralong datasets](https://academic.oup.com/bioinformatics/advance-article/doi/10.1093/bioinformatics/btae014/7515251)

**Pinglu Zhang**, Huan Liu, Yanming Wei, Yixiao Zhai, Qinzhong Tian, Quan Zou\*

**Bioinformatics, 2024, 中科院3区, CCF-B, IF2024=4.4.** 

[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/FMAlign2.pdf)&nbsp;&nbsp;[**Code**](https://github.com/malabz/FMAlign2)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:u-x6o8ySG0sC'></span></strong>

- FMAlign2 is an improved MSA method that uses a suffix array and vertical division strategy to align ultralong sequences in parallel. 
- FMAlign2 reduces processing time while maintaining accuracy, handling sequences up to billions in length efficiently.

</div>
</div>

- [High-Quality Large-Scale Viral Genome Multiple Sequence Alignment with Updated HAlign4](https://doi.org/10.1007/978-981-92-3498-1_25), **P Zhang**, Q Tian, Y Zhai, H Liu, Q Zou. International Conference on Intelligent Computing, 2026, pp. 291–302.&nbsp;&nbsp;[**Paper**](https://doi.org/10.1007/978-981-92-3498-1_25)&nbsp;&nbsp;[**Code**](https://github.com/pinglu-zhang/HAlign-4)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:LkGwnXOMwfcC'></span></strong>

- [Chimera: Ultrafast and Memory-efficient Database Construction for High-Accuracy Taxonomic Classification in the Age of Expanding Genomic Data](https://www.biorxiv.org/content/10.1101/2025.03.26.645388v1.abstract), Q Tian<sup>†</sup>, **P Zhang**<sup>†</sup>, Y Wei, Q Zou, Y Wang\*, X Luo\*. bioRxiv, 2025.&nbsp;&nbsp;[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/Chimera.pdf)&nbsp;&nbsp;[**Code**](https://github.com/LoadStar822/Chimera)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:IjCSPb-OGe4C'></span></strong>

- [Fast and memory efficient partial order alignment with minipoa](https://doi.org/10.1101/gr.282046.126), H Liu, **P Zhang**, Y Wei, Q Tian, Y Zhai, Q Zou, M Niu. Genome Research, 2026，中科院1区, nature index journal, IF2025=6.3.&nbsp;&nbsp;[**Paper**](https://doi.org/10.1101/gr.282046.126)&nbsp;&nbsp;[**Code**](https://github.com/NCl3-lhd/minipoa)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:Se3iqnhoufwC'></span></strong>

* [deMEM: a novel divide-and-conquer framework based on de Bruijn graph for scalable multiple sequence alignment](https://academic.oup.com/gigascience/advance-article/doi/10.1093/gigascience/giaf163/8414073), Y Wei, Z Huang, **P Zhang**, Y Wang, Y Li, L Yu*, Q Zou\*. GigaScience, 2026, 中科院2区, IF2024=3.9.  [**Paper**](https://academic.oup.com/gigascience/advance-article-pdf/doi/10.1093/gigascience/giaf163/66263799/giaf163.pdf)  [**Code**](https://github.com/malabz/deMEM)  <strong><span class='show_paper_citations' data='T70BtHMAAAAJ:W7OEmFMy1HYC'></span></strong>

- [Application and Comparison of Machine Learning and Database-Based Methods in Taxonomic Classification of High-Throughput Sequencing Data](https://academic.oup.com/gbe/article-abstract/16/5/evae102/7674165), Q Tian, **P Zhang**, Y Zhai, Y Wang\*, Q Zou\*. Genome Biology and Evolution, 2024, 中科院2区, IF2024=3.2.&nbsp;&nbsp;[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/sequence%20classification%20survey.pdf)&nbsp;&nbsp;[**Code**](http://lab.malab.cn/~tqz/project/taxonomic/)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:9yKSN-GCB0IC'></span></strong>

- [TPMA: A two pointers meta-alignment tool to ensemble different multiple nucleic acid sequence alignments](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011988), Y Zhai, J Chao, Y Wang, **P Zhang**, F Tang\*, Q Zou\*. PLOS Computational Biology, 2024, 中科院2区, CCF-B, IF2024=3.8.&nbsp;&nbsp;[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/TPMA.pdf)&nbsp;&nbsp;[**Code**](https://github.com/malabz/TPMA)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:d1gkVwhDpl0C'></span></strong>

- [ReAlign-P: A vertical iterative realignment method for protein multiple sequence alignment](https://doi.org/10.1093/bioinformatics/btaf421), Y Zhai, **P Zhang**, Q Zou, X Luo\*. Bioinformatics, 2025, 中科院3区, CCF-B, IF2025=5.4.&nbsp;&nbsp;[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/ReAlign-P.pdf)&nbsp;&nbsp;[**Code**](https://github.com/malabz/ReAlign-P)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:Tyk-4Ss8FVUC'></span></strong>

- [HAlign-4: A New Strategy for Rapidly Aligning Millions of Sequences](https://doi.org/10.1093/bioinformatics/btae718), T Zhou, **P Zhang**,  Q Zou\*, W Han\*. Bioinformatics, 2024, 中科院3区, CCF-B, IF2024=4.4.&nbsp;&nbsp;[**Paper**](https://github.com/pinglu-zhang/pinglu-zhang.github.io/blob/main/paper/HAlign4.pdf)&nbsp;&nbsp;[**Code**](https://github.com/pinglu-zhang/HAlign-4)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:2osOgNQ5qMEC'></span></strong>

- [TAXICF: Efficient Index Construction and Accurate Metagenomic Classification with Interleaved Cuckoo Filters](https://doi.org/10.1007/978-981-92-3498-1_30), Q Tian, **P Zhang**, Q Zou. International Conference on Intelligent Computing, 2026, pp. 349–360.&nbsp;&nbsp;[**Paper**](https://doi.org/10.1007/978-981-92-3498-1_30)&nbsp;&nbsp;[**Code**](https://github.com/LoadStar822/TAXICF)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:roLk4NBRz8UC'></span></strong>

- [ReAlign-Star: An Optimized Realignment Method for Multiple Sequence Alignment, Targeting Star Algorithm Tools](https://doi.org/10.1007/978-981-95-0030-7_38), Y Zhai, **P Zhang**, Y Liu, Q Zou\*. International Conference on Intelligent Computing, 2025, CCF-C.&nbsp;&nbsp;[**Paper**](https://link.springer.com/chapter/10.1007/978-981-95-0030-7_38)&nbsp;&nbsp;[**Code**](https://github.com/malabz/ReAlign-Star)&nbsp;&nbsp;<strong><span class='show_paper_citations' data='T70BtHMAAAAJ:zYLM7Y9cAGgC'></span></strong>
