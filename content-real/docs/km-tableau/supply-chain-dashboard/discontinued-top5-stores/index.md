---
title:  "Discontinued Top 5 Stores"
date:   2024-11-06
---

# Discontinued Top 5 Stores

## Parameters

```code
Supported Parameters

ParamName: Inventory Class
ParamType: CHAR(2)
ParamDisplay: Checkbox List
ParamSQL:
SELECT CLASSNUM AS InvClass, CLASSNAME
FROM KMTDTA.CLASSES
WHERE ACTIVE = 'Y'
ORDER BY CLASSNUM

ParamName: Vendor Number
ParamType: CHAR(3)
ParamDisplay: Checkbox List
ParamSQL:
SELECT VENDNUM, VENDNAME
FROM KMTDTA.VENDORS
ORDER BY VENDNAME

```

## SQL Statement
```sql
-- Supply Chain Dashboard > Discontinued $ - Top 5 Stores

SELECT Store,
  -- With Formatting
  -- VARCHAR_FORMAT(OHVPhaseOut,'$999,999,999.99') AS PhaseOut,
  -- VARCHAR_FORMAT(OHVDiscontinued,'$999,999,999.99') AS Discontinued,
  -- VARCHAR_FORMAT(OHVTotal,'$999,999,999.99') AS Total
  
  -- Without Formatting
  OHVPhaseOut AS PhaseOut,
  OHVDiscontinued AS Discontinued,
  OHVTotal AS Total
  
FROM (
  SELECT p.PDSTORE AS Store,
    SUM(CASE WHEN LOCATE('>', TRIM(p.PDDESCRIP)) BETWEEN 1 AND LENGTH(TRIM(p.PDDESCRIP))-1
      THEN p.PDINVENTRY * (p.PDACTCOST + p.PDFEDTAX) ELSE 0 END) AS OHVPhaseOut,  
    SUM(CASE WHEN LOCATE('*', TRIM(p.PDDESCRIP)) BETWEEN 1 AND LENGTH(TRIM(p.PDDESCRIP))-1
      THEN p.PDINVENTRY * (p.PDACTCOST + p.PDFEDTAX) ELSE 0 END) AS OHVDiscontinued,
    SUM(CASE WHEN LOCATE('*', TRIM(p.PDDESCRIP)) BETWEEN 1 AND LENGTH(TRIM(p.PDDESCRIP))-1
      OR LOCATE('>', TRIM(p.PDDESCRIP)) BETWEEN 1 AND LENGTH(TRIM(p.PDDESCRIP))-1
      THEN p.PDINVENTRY * (p.PDACTCOST + p.PDFEDTAX) ELSE 0 END) AS OHVTotal      
   FROM DTA273.TMPROD p
     LEFT JOIN KMTDTA.VENDORS v ON p.PDVENDOR = v.VENDNUM
   WHERE p.PDDELETE = 'A'
     AND TRIM(p.PDCLASS) NOT IN ('2','9')
     AND p.PDCLASS IS NOT NULL
     AND v.VENDNUM IN (101,102,111,120,125,133,136,141,142,149,150,153,154,159,162,165,170,180,202,217,221,230,852)
     -- Bridgestone-101, BKT Tires-180, Carlisle-136, Continental-142, Cooper-125, Double Coin-230, Dunlop-153, Falken-170, Firestone-102, General-141, Goodyear-150, Hankook-111, Ironhead-221, Kelly-154, Kumho-165, Michelin-120, Misc Tires + Wheels-852, Nexen-202, Pirelli-133, Super Cargo-159, Thunderer-217, Titan Farm-149, Yokohama-162
  GROUP BY p.PDSTORE
  ORDER BY OHVTotal DESC
  LIMIT 5
) z

```

## Returned Dataset

```csv
"STORE","PHASEOUT","DISCONTINUED","TOTAL"
"1","44620.5700","232131.4500","276752.0200"
"83","29198.8600","197187.3400","226386.2000"
"47","29723.9700","169889.3100","199613.2800"
"17","71872.0500","102018.5600","173890.6100"
"43","32008.8000","101882.8800","133891.6800"
```

## Output

![Discontinued Top 5 Stores](/discontinued-top5-stores.png)
