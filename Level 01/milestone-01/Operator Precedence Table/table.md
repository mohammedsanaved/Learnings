| **Precedence** | **Operator** | **Description**                 | **Associativity**     | **Example**                 |               |      |     |     |
| -------------- | ------------ | ------------------------------- | --------------------- | --------------------------- | ------------- | ---- | --- | --- |
| 1              | `()`         | Grouping                        | -                     | `(1+2)`                     |               |      |     |     |
| 2              | `.`          | Member                          | left to right         | `obj.function`              |               |      |     |     |
| 2.1            | `[]`         | Member                          | left to right         | `brand["carName"]`          |               |      |     |     |
| 2.2            | `new`        | Create                          | -                     | `new Date("July 27, 2023")` |               |      |     |     |
| 2.3            | `()`         | Function Call                   | -                     | `myFun()`                   |               |      |     |     |
| 3              | `++`         | Postfix increment               | N/A                   | `i++`                       |               |      |     |     |
| 3.1            | `--`         | Postfix decrement               | N/A                   | `i--`                       |               |      |     |     |
| 4              | `++`         | Prefix increment                | right to left         | `++i`                       |               |      |     |     |
| 4.1            | `--`         | Prefix decrement                | -                     | `--i`                       |               |      |     |     |
| 4.2            | `!`          | Logical NOT                     | -                     | `!(x===y)`                  |               |      |     |     |
| 4.3            | `typeof`     | Type                            | -                     | `typeof a`                  |               |      |     |     |
| 5              | `**`         | Exponentiation                  | right to left         | `4**2`                      |               |      |     |     |
| 6              | `*`          | Multiplication                  | left to right         | `2*3`                       |               |      |     |     |
| 6.1            | `/`          | Division                        | left to right         | `18/9`                      |               |      |     |     |
| 6.2            | `%`          | Remainder                       | left to right         | `4%2`                       |               |      |     |     |
| 7              | `+`          | Addition                        | left to right         | `2+4`                       |               |      |     |     |
| 7.1            | `-`          | Subtraction                     | left to right         | `4-2`                       |               |      |     |     |
| 8              | `<<`         | Left shift                      | left to right         | `y<<2`                      |               |      |     |     |
| 8.1            | `>>`         | Right shift                     | left to right         | `y>>2`                      |               |      |     |     |
| 8.2            | `>>>`        | Unsigned right shift            | left to right         | `y>>>2`                     |               |      |     |     |
| 9              | `<`          | Less than                       | left to right         | `3<4`                       |               |      |     |     |
| 9.1            | `<=`         | Less than or equal to           | left to right         | `3<=4`                      |               |      |     |     |
| 9.2            | `>`          | Greater than                    | left to right         | `4>3`                       |               |      |     |     |
| 9.3            | `>=`         | Greater than or equal to        | left to right         | `4>=3`                      |               |      |     |     |
| 9.4            | `in`         | Property check                  | left to right         | `"PI" in Math`              |               |      |     |     |
| 9.5            | `instanceof` | Instance check                  | left to right         | `A instanceof B`            |               |      |     |     |
| 10             | `==`         | Equality                        | left to right         | `x==y`                      |               |      |     |     |
| 10.1           | `!=`         | Inequality                      | left to right         | `x!=y`                      |               |      |     |     |
| 10.2           | `===`        | Strictly equal                  | left to right         | `x===y`                     |               |      |     |     |
| 10.3           | `!==`        | Strictly unequal                | left to right         | `x!==y`                     |               |      |     |     |
| 11             | `&`          | Bitwise AND                     | left to right         | `x&y`                       |               |      |     |     |
| 12             | `^`          | Bitwise XOR                     | left to right         | `x^y`                       |               |      |     |     |
| 13             | \`           | \`                              | Bitwise OR            | left to right               | \`x           | y\`  |     |     |
| 14             | `&&`         | Logical AND                     | left to right         | `x&&y`                      |               |      |     |     |
| 15             | \`           |                                 | \`                    | Logical OR                  | left to right | \`x  |     | y\` |
| 16             | `? :`        | Conditional                     | right to left         | `(x>y)?x:y`                 |               |      |     |     |
| 17             | `=`          | Assignment                      | right to left         | `x=5`                       |               |      |     |     |
| 17.1           | `+=`         | Addition assignment             | right to left         | `x+=5`                      |               |      |     |     |
| 17.2           | `-=`         | Subtraction assignment          | right to left         | `x-=5`                      |               |      |     |     |
| 17.3           | `*=`         | Multiplication assignment       | right to left         | `x*=5`                      |               |      |     |     |
| 17.4           | `/=`         | Division assignment             | right to left         | `x/=5`                      |               |      |     |     |
| 17.5           | `%=`         | Modulo assignment               | right to left         | `x%=5`                      |               |      |     |     |
| 17.6           | `<<=`        | Left shift assignment           | right to left         | `x<<=5`                     |               |      |     |     |
| 17.7           | `>>=`        | Right shift assignment          | right to left         | `x>>=5`                     |               |      |     |     |
| 17.8           | `>>>=`       | Unsigned right shift assignment | right to left         | `x>>>=5`                    |               |      |     |     |
| 17.9           | `&=`         | Bitwise AND assignment          | right to left         | `x&=5`                      |               |      |     |     |
| 17.10          | `^=`         | Bitwise XOR assignment          | right to left         | `x^=5`                      |               |      |     |     |
| 17.11          | \`           | =\`                             | Bitwise OR assignment | right to left               | \`x           | =5\` |     |     |
| 18             | `yield`      | Pause function                  | right to left         | `yield x`                   |               |      |     |     |
| 19             | `,`          | Comma                           | left to right         | `x,y`                       |               |      |     |     |
