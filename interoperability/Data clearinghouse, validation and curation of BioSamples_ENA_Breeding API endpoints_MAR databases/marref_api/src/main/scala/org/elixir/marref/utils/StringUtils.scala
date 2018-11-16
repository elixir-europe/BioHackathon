package org.elixir.marref.utils

object StringUtils {
  /**
    * Prints the string as is if smaller than maxLength
    * Otherwise prints the truncated string terminated by "..."
    * Returns never more than maxLength characters
    */
  def truncateString(s: String, maxLength: Int = 255): String = {
    val termination = "..."
    if (s.length > maxLength) {
      val diff = maxLength - termination.length
      if (diff >= 0)
        s.take(diff) + termination
      else
        termination.take(maxLength)
    } else
      s
  }
}
