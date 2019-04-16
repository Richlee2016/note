module.exports = app => {
  const mongoose = app.mongoose;
  const ArticleSchema = new mongoose.Schema({
    name: String,
    type: Number,
    content: Buffer,
    group: {
      type: Boolean,
      default: false
    },
    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      },
      updateAt: {
        type: Date,
        default: Date.now()
      }
    }
  });

  ArticleSchema.pre('save', function(this: any, next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  return mongoose.model('t_article', ArticleSchema);
};
