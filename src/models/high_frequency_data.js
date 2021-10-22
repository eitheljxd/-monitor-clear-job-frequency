module.exports = (sequelize, type) => {
  return sequelize.define(
    "high_frequency_data",
    {
      row_high_frequency_data: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      row_point: type.INTEGER,
      row_survey : type.INTEGER,
      hf_timestamp: type.STRING,
      hf_measure_x: type.DECIMAL,
      hf_measure_y: type.DECIMAL,
      create_user: type.STRING,
      state: {
        allowNull: false,
        type: type.BOOLEAN,
      },
      update_date: type.DATE,
      update_user: type.DATE,
      create_date: type.DATE,
    },
    {
      timestamps: false,
    }
  );
};
