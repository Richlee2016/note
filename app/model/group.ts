module.exports = app => {
  const mongoose = app.mongoose;
  const GroupSchema = new mongoose.Schema({
    name: String,
    group: {
      type: Array,
      default: []
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

  GroupSchema.pre('save', function(this: any, next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  return mongoose.model('t_group', GroupSchema);
};
