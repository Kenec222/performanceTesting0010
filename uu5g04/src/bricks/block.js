/**
 * Copyright (C) 2021 Unicorn a.s.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License at
 * <https://gnu.org/licenses/> for more details.
 *
 * You may obtain additional information at <https://unicorn.com> or contact Unicorn a.s. at address: V Kapslovne 2767/2,
 * Praha 3, Czech Republic or at the email: info@unicorn.com.
 */

//@@viewOn:imports
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";
import Css from "./internal/css.js";

const EditableBlock = UU5.Common.Component.lazy(async () => {
  await SystemJS.import("uu5g04-forms");
  await SystemJS.import("uu5g04-bricks-editable");
  return import("./internal/block-editable.js");
});

let editationLazyLoaded = false;

import "./block.less";
//@@viewOff:imports

export const Block = UU5.Common.VisualComponent.create({
  displayName: "Block", // for backward compatibility (test snapshots)
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.NestingLevelMixin,
    UU5.Common.ColorSchemaMixin,
    UU5.Common.ContentMixin,
    UU5.Common.PureRenderMixin,
    UU5.Common.EditableMixin,
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Block"),
    nestingLevelList: UU5.Environment.getNestingLevelList("bigBoxCollection", "box"),
    classNames: {
      main: ns.css("block"),
      bg: ns.css("block-bg"),
      editation: ns.css("block-editation"),
      inline: () => Css.css`
        padding: 0px 8px;
      `,
    },
    opt: {
      nestingLevelWrapper: true,
    },
    editMode: {
      enablePlaceholder: true,
      startMode: "button",
    },
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    background: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps: function () {
    return {
      background: false,
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      editationLazyLoaded: false,
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  onBeforeForceEndEditation_() {
    return this._editableBlock ? this._editableBlock.getPropsToSave() : undefined;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _buildMainAttrs: function (isInline = false) {
    var mainAttrs = this.getMainAttrs();
    this.props.background && (mainAttrs.className += " " + this.getClassName().bg);
    isInline && (mainAttrs.className += " " + this.getClassName("inline"));
    return mainAttrs;
  },

  _registerNull(inst) {
    // unmount of component means that suspense is loaded and component should be rendered
    if (!inst) {
      this.setState((state) => {
        if (state.editationLazyLoaded) return;

        // Edit component is loaded - need to set to static variable because other Edit component does not render fallback component
        // editationLazyLoaded is stored in both state and static variable for cases such as when more edit modes are loaded at the same time
        editationLazyLoaded = true;
        return { editationLazyLoaded: true };
      });
    }
  },

  _isEditationLazyLoaded() {
    return editationLazyLoaded;
  },

  _renderEditationMode() {
    return (
      <UU5.Common.Suspense fallback={<span ref={this._registerNull} />}>
        <EditableBlock component={this} ref_={this._registerEditableBlock} />
      </UU5.Common.Suspense>
    );
  },

  _registerEditableBlock(block) {
    this._editableBlock = block;
  },
  //@@viewOff:private

  //@@viewOn:render
  render: function () {
    let nestingLevel = this.getNestingLevel();
    let content = (
      <>
        {this.state.editation ? this._renderEditationMode() : null}
        {!this.state.editation || !this._isEditationLazyLoaded() ? [this.getChildren(), this.getDisabledCover()] : null}
      </>
    );
    return nestingLevel ? (
      <div {...this._buildMainAttrs()}>{content}</div>
    ) : (
      <span {...this._buildMainAttrs(true)}>{content}</span>
    );
  },
  //@@viewOff:render
});

export default Block;
