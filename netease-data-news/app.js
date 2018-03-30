var data = [
  { province: "北京", accident: 226, death: 91 },
  { province: "上海", accident: 157, death: 77 },
  { province: "天津", accident: 121, death: 21 },
  { province: "贵州", accident: 151, death: 113 },
  { province: "浙江", accident: 733, death: 236 },
  { province: "湖南", accident: 172, death: 162 },
  { province: "湖北", accident: 435, death: 121 },
  { province: "四川", accident: 310, death: 142 },
  { province: "广西", accident: 262, death: 186 },
  { province: "广东", accident: 639, death: 384 },
  { province: "云南", accident: 195, death: 126 },
  { province: "重庆", accident: 216, death: 113 },
  { province: "河南", accident: 307, death: 232 },
  { province: "河北", accident: 295, death: 295 },
  { province: "吉林", accident: 164, death: 74 },
  { province: "黑龙江", accident: 112, death: 155 },
  { province: "辽宁", accident: 147, death: 104 },
  { province: "安徽", accident: 264, death: 198 },
  { province: "江西", accident: 181, death: 64 },
  { province: "陕西", accident: 222, death: 144 },
  { province: "山西", accident: 174, death: 120 },
  { province: "山东", accident: 426, death: 196 },
  { province: "青海", accident: 11, death: 4 },
  { province: "甘肃", accident: 151, death: 81 },
  { province: "江苏", accident: 572, death: 330 },
  { province: "海南", accident: 44, death: 7 },
  { province: "福建", accident: 292, death: 72 },
  { province: "宁夏", accident: 82, death: 46 },
  { province: "内蒙古", accident: 140, death: 132 },
  { province: "西藏", accident: 3, death: 2 },
  { province: "新疆", accident: 166, death: 81 }
];

var R = 200,
  scale = 4,
  π = Math.PI,
  π2 = 2 * π;

var svg = d3.select('.graph')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600)
  .append('g')
  .attr('transform', 'translate(400, 300)');

var line0 = d3.svg.line()
  .x(function(d, i) { return Math.cos(i / 31 * π2 - 0.5 * π) * (R + 20) })
  .y(function(d, i) { return Math.sin(i / 31 * π2 - 0.5 * π) * (R + 20) })
  .interpolate("linear");

var accidentLine = d3.svg.line()
  .x(function(d, i) { return Math.cos(i / 31 * π2 - 0.5 * π) * (R + 20 + d.accident / scale) })
  .y(function(d, i) { return Math.sin(i / 31 * π2 - 0.5 * π) * (R + 20 + d.accident / scale) })
  .interpolate("linear");

var deathLine = d3.svg.line()
  .x(function(d, i) { return Math.cos(i / 31 * π2 - 0.5 * π) * (R + 20 + d.death / scale) })
  .y(function(d, i) { return Math.sin(i / 31 * π2 - 0.5 * π) * (R + 20 + d.death / scale) })
  .interpolate("linear-closed");

d3.select('#reveal').on('change', function() {
  d3.selectAll('.accident-area, .death-line, .death-ticks, .death-labels, .accident-labels, .province').classed('reveal', this.checked)
});


// 绘制事故区域
svg.append("path")
  .classed('accident-area', true)
  .attr('fill', '#CBE9E8')
  .attr('opacity', 0)
  .attr('d', line0(data))
  .transition().duration(600)
  .attr('opacity', 1)
  .attr("d", accidentLine(data));

// 绘制死亡人数折线
svg.append("path")
  .classed('death-line', true)
  .attr('fill', 'none')
  .attr('stroke', '#E78221')
  .attr('d', line0(data))
  .attr('opacity', 0)
  .transition().duration(700)
  .attr('opacity', 1)
  .attr("d", deathLine(data));

// 事故折线区域 Ticks
svg
  .append('g').classed('death-ticks', true)
  .selectAll('.death-tick').data(data)
  .enter()
  .append('line')
  .classed('death-tick', true)
  .attr('x1', function(d, i) { return Math.cos(i / 31 * π2 - 0.5 * π) * (R + 20) })
  .attr('y1', function(d, i) { return Math.sin(i / 31 * π2 - 0.5 * π) * (R + 20) })
  .attr('x2', function(d, i) { return Math.cos(i / 31 * π2 - 0.5 * π) * (R + 20 + d.accident / scale) })
  .attr('y2', function(d, i) { return Math.sin(i / 31 * π2 - 0.5 * π) * (R + 20 + d.accident / scale) })

// 死亡人数 Labels
svg
  .append('g').classed('death-labels', true)
  .selectAll('.death-label').data(data)
  .enter()
  .append('text')
  .attr('class', 'death-label')
  .attr('transform', function(d, i) {
    var offset = 25,
      x = Math.cos(i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale),
      y = Math.sin(i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale);

    return 'rotate(' + 360 * i / 31 + ',' + x + ',' + y + ')';
  })
  .attr('x', function(d, i) {
    var offset = 25;
    return Math.cos(i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale)
  })
  .attr('y', function(d, i) {
    var offset = 25;
    return Math.sin(i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale)
  })
  .text(function(d) { return d.death; })
  .filter(function(d, i) {
    d.i = i;
    return (360 * i / 31) > 90 && (360 * i / 31) < 270;
  })
  .attr('text-anchor', 'end')
  .attr('x', function(d, i) {
    var offset = (d.accident - d.death > 40 && d.accident !== d.death) ? 35 : 30;
    return Math.cos(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale)
  })
  .attr('y', function(d, i) {
    var offset = (d.accident - d.death > 40 && d.accident !== d.death) ? 35 : 30;
    return Math.sin(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale)
  })
  .attr('transform', function(d, i) {
    var offset = (d.accident - d.death > 40 && d.accident !== d.death) ? 35 : 30,
      x = Math.cos(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale),
      y = Math.sin(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.death / scale);

    return 'rotate(' + (360 * d.i / 31 - 180) + ',' + x + ',' + y + ')';
  });

// 事故数 Labels
svg
  .append('g').classed('accident-labels', true)
  .selectAll('.accident-label').data(data)
  .enter()
  .append('text')
  .attr('class', 'accident-label')
  .attr('transform', function(d, i) {
    var offset = (d.accident - d.death >= 5) ? 35 : 45,
      x = Math.cos(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale),
      y = Math.sin(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale);

    return 'rotate(' + 360 * i / 31 + ',' + x + ',' + y + ')';
  })
  .attr('x', function(d, i) {
    var offset = (d.accident - d.death >= 5) ? 35 : 45;
    return Math.cos(i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale)
  })
  .attr('y', function(d, i) {
    var offset = (d.accident - d.death >= 5) ? 35 : 45
    return Math.sin(i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale)
  })
  .text(function(d) { return d.accident; })
  .filter(function(d, i) {
    d.i = i;
    return (360 * i / 31) > 90 && (360 * i / 31) < 270;
  })
  .attr('text-anchor', 'end')
  .attr('x', function(d, i) {
    var offset = (d.accident - d.death >= 7 || d.accident == d.death) ? 40 : 20;
    return Math.cos(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale)
  })
  .attr('y', function(d, i) {
    var offset = (d.accident - d.death >= 7 || d.accident == d.death) ? 40 : 20;
    return Math.sin(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale)
  })
  .attr('transform', function(d, i) {
    var offset = (d.accident - d.death >= 7 || d.accident == d.death) ? 40 : 20,
      x = Math.cos(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale),
      y = Math.sin(d.i / 31 * π2 - 0.5 * π) * (R + offset + d.accident / scale);

    return 'rotate(' + (360 * d.i / 31 - 180) + ',' + x + ',' + y + ')';
  });


var provinceNameGroup = svg.append('g').classed('province', true);

// 绘制白色圆形底板
provinceNameGroup.append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 220)
  .attr('fill', '#fff');

// 绘制省份名称
provinceNameGroup.selectAll('.province-label').data(data)
  .enter()
  .append('text')
  .attr('class', 'province-label')
  .attr('transform', function(d, i) { return 'rotate(' + 360 * i / 31 + ',' + Math.cos(i / 31 * π2 - 0.5 * π) * R + ',' + Math.sin(i / 31 * π2 - 0.5 * π) * R + ')' })
  .attr('x', function(d, i) { return Math.cos(i / 31 * π2 - 0.5 * π) * R })
  .attr('y', function(d, i) { return Math.sin(i / 31 * π2 - 0.5 * π) * R })
  .text(function(d) { return d.province; })
  .filter(function(d, i) {
    return (360 * i / 31) > 90 && (360 * i / 31) < 270;
  })
  .attr('text-anchor', 'end')
  .attr('transform', function(d, i) {
    var attrs = this.attributes;
    return 'rotate(' + (360 * i / 31 - 90) + ',' + attrs.x.value + ',' + attrs.y.value + ')'
  });
