class Transformer {
  static transform(values) {
    if (!values) return {};
    const o = {};
    o[values.logical_operator] = values.rules;
    o.active = values.active;
    o.description = values.description;
    o.action = { name: values.action, params: values.params };
    return o;
  }
}
export default Transformer;
