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

//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";

import Footer from "./blockquote-footer.js";

import "./blockquote.less";
//@@viewOff:imports

export const Blockquote = createReactClass({
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.NestingLevelMixin,
    UU5.Common.ColorSchemaMixin,
    UU5.Common.ContentMixin,
    UU5.Common.PureRenderMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Blockquote"),
    nestingLevelList: UU5.Environment.getNestingLevelList("bigBoxCollection", "box"),
    classNames: {
      main: ns.css("blockquote"),
      bg: ns.css("blockquote-bg"),
      right: "blockquote-reverse",
      noSpacing: ns.css("blockquote-nospacing")
    },
    opt: {
      nestingLevelWrapper: true
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    background: PropTypes.bool,
    alignment: PropTypes.oneOf(["left", "right"]),
    footer: PropTypes.any,
    footerAlignment: PropTypes.oneOf(["left", "right"]),
    noSpacing: PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps: function() {
    return {
      background: false,
      alignment: "left",
      footer: null,
      footerAlignment: null,
      noSpacing: false
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _buildMainAttrs: function() {
    var mainAttrs = this.getMainAttrs();
    this.props.background && (mainAttrs.className += " " + this.getClassName().bg);
    this.props.alignment === "right" && (mainAttrs.className += " " + this.getClassName().right);
    this.props.noSpacing && (mainAttrs.className += " " + this.getClassName().noSpacing);
    return mainAttrs;
  },

  _getFooterAlignment: function() {
    return this.props.footerAlignment || this.props.alignment;
  },
  //@@viewOff:private

  //@@viewOn:render
  render: function() {
    return this.getNestingLevel() ? (
      <blockquote {...this._buildMainAttrs()}>
        {this.getChildren()}
        {this.props.footer && <Footer content={this.props.footer} alignment={this._getFooterAlignment()} />}
        {this.getDisabledCover()}
      </blockquote>
    ) : null;
  }
  //@@viewOff:render
});

export default Blockquote;
