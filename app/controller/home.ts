import { Controller } from 'egg';
import { Contro, Get, Prefix, Post } from '../router';
@Prefix([ 'home' ])
@Contro('/')
export default class HomeController extends Controller {
  @Get('/')
  public async index() {
    const { ctx } = this;
    const res = await ctx.service.home.getGroups();
    await ctx.render('home.html', { data: res || [] });
  }
  // @Get('/savezf')
  public async savezf() {
    const { ctx } = this;
    await ctx.service.home.incluedHtml();
    ctx.body = 2;
  }
  @Get('/admin')
  public async pageadmin() {
    await this.ctx.render('admin.html');
  }
  @Get('/page/:name')
  public async page() {
    const { ctx } = this;
    const { name } = ctx.params;
    const res = await ctx.service.home.getArt(name);
    await ctx.render('zf.html', { data: res.content.toString() });
  }

  @Get('/api/getarts')
  public async getarts() {
    const { ctx } = this;
    const res = await ctx.service.home.getArts();
    ctx.body = res;
  }

  @Get('/api/getgroups')
  public async getgroups() {
    const { ctx } = this;
    const res = await ctx.service.home.getGroups();
    ctx.body = res;
  }

  @Post('/api/addgroup')
  public async addGroup() {
    const { ctx } = this;
    const { art, group } = ctx.request.body;
    const res = await ctx.service.home.addGroup(art, group);
    ctx.body = res;
  }

  @Get('/api/getArtGroup/:id')
  public async getArtGroup() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.home.artAndGroup(id);
    ctx.body = res;
  }
}
