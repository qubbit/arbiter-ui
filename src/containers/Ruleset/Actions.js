import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import { Timeline, Icon, Input, Button, Select } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Item } = Timeline;
const { Option } = Select;

class Actions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAction: Object.keys(this.props.schema.actions)[0]
    };
  }

  getListStyle = isDraggingOver => ({
    padding: 8
  });

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    paddingLeft: '10px',
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle
  });

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const newIndex = result.destination.index;
    const oldIndex = result.source.index;

    if (newIndex === oldIndex) return;

    this.props.reorderActions(oldIndex, newIndex);
  };

  selectAction = action => {
    this.setState({ selectedAction: action });
  };

  addAction = e => {
    if (
      this.props.ruleset.actions.find(a => a.name === this.state.selectedAction)
    ) {
      return;
    }
    this.props.addAction(this.state.selectedAction);
  };

  removeAction = name => {
    this.props.removeAction(name);
  };

  render() {
    const availableActions = this.props.schema.actions;
    const actionNames = Object.keys(availableActions);
    const rulesetActions = this.props.ruleset.actions;

    return (
      <div className="col">
        <div className="ui-area-header">
          <Icon type="thunderbolt" theme="twoTone" twoToneColor="#FFC107" />{' '}
          ACTIONS
        </div>
        <div className="action-selection">
          <div className="field-container action__name">
            <Select
              name="action"
              defaultValue={actionNames[0]}
              style={{ width: 250 }}
              hasFeedback={false}
              onChange={this.selectAction}
            >
              {actionNames.map(a => (
                <Option key={`action-${a}`} value={a}>
                  {availableActions[a].label}
                </Option>
              ))}
            </Select>
          </div>
          <Button
            className="field-container"
            title="Add action"
            icon="plus"
            onClick={this.addAction}
          >
            Action
          </Button>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={this.getListStyle(snapshot.isDraggingOver)}
              >
                <div className="actions">
                  <Timeline>
                    {rulesetActions.map((a, index) => (
                      <Draggable
                        key={`draggable-action-${a.name}`}
                        draggableId={a.name}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Item>
                            <div
                              key={`action-${a.name}`}
                              className="action"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={this.getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="action-name">
                                <span>
                                  <strong>{a.name}</strong>
                                </span>
                                <span>
                                  <Button
                                    className="field-container"
                                    type="danger"
                                    title="Remove action"
                                    icon="delete"
                                    onClick={() => {
                                      this.removeAction(a.name);
                                    }}
                                  />
                                </span>
                              </div>
                              {rulesetActions[index].params.map(param => {
                                return (
                                  <div
                                    style={{ marginBottom: '20px' }}
                                    key={`action-${a.name}-param-${param.name}`}
                                  >
                                    <Input addonBefore={param.name} />
                                  </div>
                                );
                              })}
                            </div>
                          </Item>
                        )}
                      </Draggable>
                    ))}
                  </Timeline>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ruleset: state.ruleset, schema: state.schema };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset
};

Actions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);

export default Actions;
