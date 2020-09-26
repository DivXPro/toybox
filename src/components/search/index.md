---
name: Search
route: /search
menu: 组件
---

import { Playground, Props } from 'docz';
import { Button } from 'antd';
import { Search } from './index.ts';
import 'antd/dist/antd.css';
import 'remixicon/fonts/remixicon.css';
import '../../styles/core.scss';

# Search

## 基本使用
<Playground>
  <Search placeholder="请输入关键词"></Search>
</Playground>


## 导航栏(Nav)模式
<Playground>
  <Search type="nav-search" placeholder="请输入关键词"></Search>
</Playground>


## 图标模式
<Playground>
  <Search.IconSearch placeholder="请输入关键词"></Search.IconSearch>
</Playground>


## Search Props
<Props of={Search} />
