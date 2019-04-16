// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportGroup from '../../../app/model/group';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Group: ReturnType<typeof ExportGroup>;
  }
}
