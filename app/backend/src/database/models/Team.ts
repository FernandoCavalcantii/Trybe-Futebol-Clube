import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

// Team.hasMany(Match, { foreignKey: 'id', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'id', as: 'awayTeam' });

export default Team;
