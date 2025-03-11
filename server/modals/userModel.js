const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
    
      email: {
        type: DataTypes.STRING,
        lowercase: true,
        trim: true,
      },
      fullname: {
        type: DataTypes.STRING,
        trim: true,
      },
      avatar: {
        type: DataTypes.STRING, // Cloudinary URL
      },
      role: {
        type: DataTypes.ENUM('student', 'teacher','user'),
        defaultValue: 'student',
      },
      coverImageUrl: {
        type: DataTypes.STRING,
      },
      coverImagePublicId: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  // Hook to hash the password before saving the user
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Instance method to validate the password
  User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // Instance method to generate access token
  User.prototype.generateAccessToken = function () {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };

  // Instance method to generate refresh token
  User.prototype.generateRefreshToken = function () {
    return jwt.sign(
      {
        id: this.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };
  User.associate = (models) => {
    User.hasMany(models.Enrollment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.belongsToMany(models.courseModel, { through: models.Enrollment, foreignKey: 'user_id' });
  };
  return User;
};
