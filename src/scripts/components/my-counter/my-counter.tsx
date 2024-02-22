import { Component, Prop, h, State } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-counter',
  styleUrl: 'my-counter.scss',
})
export class MyCounter {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() counter: number;

  private counting: number;

  componentWillLoad() {
    this.counter = 0;
    this.counting = window.setInterval(_ => {
      this.counter++;
    }, 500);
  }

  disconnectedCallback() {
    window.clearInterval(this.counting);
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()} ({this.counter})</div>;
  }
}
