# @poly-sheets/formula

This package implements formula expressions for Poly-sheets

As in other spreadsheets, formulas in Poly-sheets are indicated by a leading `=` sign. This library handles everything that comes after
that.

## Expression syntax:

### Literals

Strings
: `"`-delimited, use `\` to escape `"` in a string

Numbers
: `/-?[0-9]+(\.[0-9]+)` no leading `+`, no trailing or leading `.`, no scientific notation

Boolean
: TRUE or FALSE, case-insensitive

NULL
: as in SQL, case-insensitive

### Cell References

Absolute Reference
: `@R`_rownum_`C`_colnum_, 0-based row/column

Relative Reference ( optional )
: `@R`_rownum_`C!` references _rownum_ in the current column
: `@R!C`_colnum_ references _colnum_ in the current row
: `@R`_+/-rowoffset_`C`_+/-coloffset, where offsets have leading `+` or `-`

### Operators

Unary 
: `-`  for Numbers only
: `NOT` for Booleans

Binary 
: Arithmetic `+`, `-`, `/`, `*`, `^`
: String `+`
: Comparison `==`, `!=`, `<`, `>`, `<=`, `>=`, operands must be of same type, result is Boolean
: `AND`, `OR`

Ternary 
: pred `?` then-value `:` else-value

### Functions
,
: pre-defined functions only. 
: `NAME` is case-insensitive
: _args_ are comma-separated values

### Grouping

`(` ... `)`
: parentheses are used to group expressions
