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

import "./table-thead.less";
//@@viewOff:imports

export default createReactClass({
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.PureRenderMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.ContentMixin,
    UU5.Common.ColorSchemaMixin,
    UU5.Common.NestingLevelMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Table.THead"),
    nestingLevelList: UU5.Environment.getNestingLevelList("bigBoxCollection", "smallBox"),
    classNames: {
      main: ns.css("table-thead")
    },
    defaults: {
      childTagName: "UU5.Bricks.Table.Tr",
      parentTagName: "UU5.Bricks.Table"
    },
    opt: {
      nestingLevelWrapper: true
    },
    errors: {
      invalidParent: "Parent of this component is not Table."
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    allowTags: PropTypes.arrayOf(PropTypes.string)
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps: function() {
    return {
      allowTags: []
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  componentWillMount: function() {
    let parent = this.getParent();

    if (parent) {
      while (parent.getOpt("parentWrapper")) {
        parent = parent.getParent();
      }
    }

    if (!(parent && parent.isTable)) {
      this.showError("invalidParent");
    }
  },

  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  isTHead() {
    return true;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  shouldChildRender_: function(child) {
    let childTagName = UU5.Common.Tools.getChildTagName(child);
    let defaultChildTagName = this.getDefault().childTagName;
    let childTagNames = this.props.allowTags.concat(defaultChildTagName);
    let result = childTagNames.indexOf(childTagName) > -1;
    if (!result && (typeof child !== "string" || child.trim())) {
      if (childTagName)
        this.showError("childTagNotAllowed", [childTagName, this.getTagName(), childTagName, defaultChildTagName], {
          mixinName: "UU5.Common.BaseMixin"
        });
      else this.showError("childNotAllowed", [child, defaultChildTagName], { mixinName: "UU5.Common.BaseMixin" });
    }
    return result;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render: function() {
    return this.getNestingLevel() ? (
      <thead {...this.getMainAttrs()}>
        {this.getChildren()}
        {this.getDisabledCover()}
      </thead>
    ) : null;
  }
  //@@viewOff:render
});
