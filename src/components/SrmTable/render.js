export default {
  functional: true,
  props: {
    row: Object,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    }

    return ctx.props.render(h, params)
  }
}
