/**
 * Copyright (C) 2019 Unicorn a.s.
 * 
 * This program is free software; you can use it under the terms of the UAF Open License v01 or
 * any later version. The text of the license is available in the file LICENSE or at www.unicorn.com.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See LICENSE for more details.
 * 
 * You may contact Unicorn a.s. at address: V Kapslovne 2767/2, Praha 3, Czech Republic or
 * at the email: info@unicorn.com.
 */

import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";

import "./container.less";

export const Container = createReactClass({
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.NestingLevelMixin,
    UU5.Common.SectionMixin,
    UU5.Common.PureRenderMixin,
    UU5.Common.EditableMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Container"),
    nestingLevelList: UU5.Environment.getNestingLevelList("container", "bigBoxCollection"),
    classNames: {
      main: ns.css("container"),
      spacing: ns.css("container-spacing"),
      noSpacing: ns.css("container-nospacing"),
      editation: ns.css("container-editation")
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    noSpacing: PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      noSpacing: false
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  onBeforeForceEndEditation_() {
    return this._editableContainer ? this._editableContainer.getPropsToSave() : undefined;
  },
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _getMainAttrs() {
    let mainAttrs = this.getMainAttrs();
    mainAttrs.className += " " + this.getClassName(this.props.noSpacing ? "noSpacing" : "spacing");
    if (this.state.editation) {
      mainAttrs.className += ` ${this.getClassName("editation")}`;
    }
    return mainAttrs;
  },

  _renderEditationMode() {
    return (
      <UU5.Common.TagPlaceholder
        key="edit-mode"
        id="edit-mode"
        tagName="UU5.BricksEditable.Container"
        props={{
          component: this,
          ref_: this._registerEditableContainer
        }}
      />
    );
  },

  _registerEditableContainer(container) {
    this._editableContainer = container;
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return this.getNestingLevel() ? (
      <div {...this._getMainAttrs()}>
        {this.state.editation
          ? this._renderEditationMode()
          : [this.getHeaderChild(), this.getChildren(), this.getFooterChild(), this.getDisabledCover()]}
      </div>
    ) : null;
  }
  //@@viewOff:render
});

export default Container;