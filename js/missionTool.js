/**
 * 洗足池ミッションの得点計算クラス
 * @class MissionSenzokuike
 * @description 洗足池ミッションの得点計算を行うクラス
 */
class MissionSenzokuike {
    static SENZOKUIKE_AREA = 41000; // 洗足池の面積
    static MAX_SCORE = 200; // 最大得点
    static SCALE = 5000; // スケールパラメータ
    static BASE_POINT = 50; // ベースポイント
    static JUST_BONUS = 50; // ジャストボーナス

    /**
     * 得点計算を行うメソッド
     * @param {number} answer - ユーザーが入力した値
     * @returns {number} score 得点
     */
    static calculate(answer) {
        const diff = Math.abs(answer - this.SENZOKUIKE_AREA);
        const magnification = Math.round((Math.exp(-1 * (diff / this.SCALE) ** 2) * 1000)) / 1000;
        console.log(magnification);
        let score = Math.round(this.MAX_SCORE * Math.exp(-1 * (diff / this.SCALE) ** 2));

        // ベースポイントを加算
        score += this.BASE_POINT
        // ジャストボーナスを加算
        if(answer === this.SENZOKUIKE_AREA) {
            score += this.JUST_BONUS;
        }

        return this.round(score);
    };

    /**
     * 二捨三入を行うメソッド
     *
     * @param {number} score - 得点
     * @returns {number} roundedScore - 二捨三入後の得点
     */
    static round(score) {
        const tens = Math.floor(score / 10);
        const ones = score % 10;

        let roundedOnes;
        if(ones <= 2) {
            roundedOnes = 0;
        } else if(ones <= 7) {
            roundedOnes = 5;
        } else {
            return (tens + 1) * 10;
        }

        return tens * 10 + roundedOnes;
    };
};

/* ========== モジュールのエクスポート ========== */
export { MissionSenzokuike };