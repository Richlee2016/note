import { Service } from 'egg';
import { resolve , join } from 'path';
import { readdirSync } from 'fs';
/** Home server */
export default class Test extends Service {
  /** 储存数据 */
  public async incluedHtml() {
    const { ctx } = this;
    const dirPath = resolve(__dirname, '../../mock/zf');
    const patharr = readdirSync(dirPath);
    for await(const path of patharr) {
      const name = path.replace(/\.txt/, '');
      console.log(`开始${name}`);
      const txt = await ctx.helper.readFile(join(dirPath, path));
      const _article = new ctx.model.Article({
          name,
          type: 1,
          content: Buffer.from(txt)
        });
      await _article.save();
    }
    return 1;
  }

  /** 获取 珠峰页面 */
  public async getArt(name: string) {
    const { ctx } = this;
    const txt = await ctx.model.Article.findOne({ name });
    return txt;
  }

  /** 获取所有页面 */
  public async getArts() {
    const arts = await this.ctx.model.Article.find({}, { _id: 1, name: 1, type: 1, group: 1 }).exec();
    return arts;
  }

  public async getGroups() {
    const group = await this.ctx.model.Group.find({}).exec();
    return group;
  }

  public async addGroup(art: string, group: string) {
    const { ctx, app: { mongoose } } = this;
    const artId = mongoose.Types.ObjectId(art);
    const groupId = mongoose.Types.ObjectId(group);
    const res = await ctx.model.Group.updateOne({ _id: groupId }, {
      $push: {
        group: artId
      }
    }).exec();
    if (res) {
      await ctx.model.Article.updateOne({ _id: artId }, { group: true }).exec();
    }
    return res;
  }

  /** 关联查 */
  public async artAndGroup(id: string) {
    const { ctx, app: { mongoose: { Types: { ObjectId } } } } = this;
    const group = await ctx.model.Group.aggregate([
      {
        $match: { _id: ObjectId(id) }
      },
      {
        $lookup: {
          from: 't_articles',
          localField: 'group',
          foreignField: '_id',
          as: 'artGroup'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          'artGroup._id': 1,
          'artGroup.name': 1
        }
      }
    ]).exec();
    return group;
  }
}
