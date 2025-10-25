import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import imagesJson from '../../images.json';

interface ImageData {
  tags: string[];
  created_at: string;
  description: string;
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'image' | 'tag';
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

@Component({
  selector: 'app-graph',
  standalone: true,
  template: `<div #chartContainer class="h-screen w-screen"></div>`,
})
export class GraphComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) container!: ElementRef<HTMLDivElement>;

  private nodes: GraphNode[] = [];
  private links: GraphLink[] = [];
  private simulation!: d3.Simulation<GraphNode, GraphLink>;
  private linkGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private nodeGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private interval = 250;

  ngOnInit() {
    this.createGraph();
  }

  createGraph() {
    const width = this.container.nativeElement.offsetWidth;
    const height = this.container.nativeElement.offsetHeight;
    const images: Record<string, ImageData> = imagesJson as any;

    const svg = d3
      .select(this.container.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.linkGroup = svg.append('g').attr('stroke', '#999').attr('stroke-opacity', 0.6);
    this.nodeGroup = svg.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5);

    this.simulation = d3
      .forceSimulation<GraphNode>(this.nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(this.links)
          .id((d) => d.id)
          .distance(100)
          .strength(0.05),
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const keys = Object.keys(images);
    this.addNextNodeWithTags(keys, images, 0);

    this.simulation.on('tick', () => {
      this.linkGroup
        .selectAll<SVGLineElement, GraphLink>('line')
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!);

      this.nodeGroup
        .selectAll<SVGCircleElement, GraphNode>('circle')
        .attr('cx', (d) => d.x!)
        .attr('cy', (d) => d.y!);
    });
  }

  private addNextNodeWithTags(keys: string[], images: Record<string, ImageData>, keyIndex: number) {
    if (keyIndex >= keys.length) return;

    const key = keys[keyIndex];
    const info = images[key];

    // Add the image node near the center
    if (!this.nodes.find((n) => n.id === key)) {
      this.nodes.push({
        id: key,
        type: 'image',
        x: Math.random() * this.container.nativeElement.offsetWidth,
        y: Math.random() * this.container.nativeElement.offsetHeight,
      });
    }

    this.updateGraph(); // update with node only

    let tagIndex = 0;
    const addNextTag = () => {
      if (tagIndex >= info.tags.length) {
        // Done with all tags, move to next node
        setTimeout(() => this.addNextNodeWithTags(keys, images, keyIndex + 1), this.interval);
        return;
      }

      const tag = info.tags[tagIndex];

      if (!this.nodes.find((n) => n.id === tag)) {
        // place tag near the parent image node for smoother motion
        const parentNode = this.nodes.find((n) => n.id === key)!;
        this.nodes.push({
          id: tag,
          type: 'tag',
          x: (parentNode.x ?? 0) + Math.random() * 20 - 10,
          y: (parentNode.y ?? 0) + Math.random() * 20 - 10,
        });
      }

      this.links.push({ source: key, target: tag });
      this.updateGraph();

      tagIndex++;
      setTimeout(addNextTag, this.interval);
    };

    addNextTag();
  }

  private updateGraph() {
    // Update links
    this.linkGroup
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(this.links, (d) => {
        const src = d.source instanceof Object ? (d.source as GraphNode).id : d.source;
        const tgt = d.target instanceof Object ? (d.target as GraphNode).id : d.target;
        return `${src}-${tgt}`;
      })
      .join('line')
      .attr('stroke-width', 2);

    // Update nodes
    const nodeSelection = this.nodeGroup
      .selectAll<SVGCircleElement, GraphNode>('circle')
      .data(this.nodes, (d) => d.id)
      .join('circle')
      .attr('r', (d) => (d.type === 'image' ? 8 : 5))
      .attr('fill', (d) => (d.type === 'image' ? '#69b3a2' : '#fca311'));

    nodeSelection.call(
      d3
        .drag<SVGCircleElement, GraphNode, unknown>()
        .on('start', (event, d) => this.dragStarted(event, d))
        .on('drag', (event, d) => this.dragged(event, d))
        .on('end', (event, d) => this.dragEnded(event, d)),
    );

    // Slightly increase link strength for smoother emergence
    (this.simulation.force('link') as d3.ForceLink<GraphNode, GraphLink>).strength(0.05);

    this.simulation.nodes(this.nodes);
    (this.simulation.force('link') as d3.ForceLink<GraphNode, GraphLink>).links(this.links);
    this.simulation.alpha(0.2).restart();
  }

  private dragStarted(event: d3.D3DragEvent<SVGCircleElement, GraphNode, unknown>, d: GraphNode) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  private dragged(event: d3.D3DragEvent<SVGCircleElement, GraphNode, unknown>, d: GraphNode) {
    d.fx = event.x;
    d.fy = event.y;
  }

  private dragEnded(event: d3.D3DragEvent<SVGCircleElement, GraphNode, unknown>, d: GraphNode) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
