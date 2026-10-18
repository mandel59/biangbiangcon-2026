-- SQLite
WITH
  -- ステップ1：表を作る
  joyo_itaiji (常用漢字, 異体字) AS (
    SELECT 漢字, 康熙字典体 FROM joyo_kangxi
    UNION
    SELECT 漢字, 漢字 FROM joyo
  ),
  japan (常用漢字, 異体字) AS (
    SELECT 常用漢字, 異体字 FROM joyo_itaiji
    UNION
    SELECT joyo_itaiji.常用漢字, unihan_variant.value
      FROM joyo_itaiji
        JOIN unihan_variant
          ON unihan_variant.property = 'kZVariant'
          AND unihan_variant.UCS = joyo_itaiji.異体字
    UNION
    SELECT joyo_itaiji.常用漢字, mji.実装したUCS
      FROM joyo_itaiji
        JOIN mjsm_JIS包摂規準UCS統合規則 AS mjsm
          ON mjsm.縮退UCS = joyo_itaiji.異体字
        JOIN mji ON mji.MJ文字図形名 = mjsm.MJ文字図形名
      WHERE mji.実装したUCS IS NOT NULL
    UNION
    VALUES ('羨', '羡'), ('舎', '舍'), ('舗', '舖'),
      ('諮', '咨'), ('駄', '馱'), ('𠮟', '叱')
  ),
  china (異体字, 規範字) AS (
    SELECT 异体字, 规范字 FROM tghb_variants
    UNION
    SELECT 规范字, 规范字 FROM tghb
    UNION
    SELECT UCS, value FROM unihan_variant
      WHERE property = 'kSimplifiedVariant'
        AND value IN (SELECT 规范字 FROM tghb)
  ),
  japan_kakusu (常用漢字, 総画数) AS (
    SELECT 実装したUCS, 総画数 FROM mji WHERE 漢字施策 = '常用漢字'
  ),
  china_kakusu (規範字, 笔画) AS (
    SELECT 规范字, 笔画 FROM tghb
  ),
  -- ステップ2：つなぎ合わせる
  jg AS (
    SELECT DISTINCT 常用漢字, 総画数, 規範字, 笔画
      FROM japan
        JOIN china USING (異体字)
        LEFT JOIN japan_kakusu USING (常用漢字)
        LEFT JOIN china_kakusu USING (規範字)
  )
-- ステップ3：絞る
SELECT * FROM jg
WHERE 総画数 < 笔画
ORDER BY 常用漢字, 規範字;
