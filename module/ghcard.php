<?php
/**
 * @package     Phproberto.Module
 * @subpackage  Ghcard
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

/**
 * Github Card module
 *
 * @since  0.0.1
 */
final class PhprobertoModuleGhcard extends PhprobertoModule
{
	/**
	 * Get the base module layout data
	 *
	 * @return  array
	 */
	public function getBaseLayoutData()
	{
		$layoutData = parent::getBaseLayoutData();

		$layoutData['profile'] = $this->getGithubProfile();

		return $layoutData;
	}

	/**
	 * Get the user github profile information
	 *
	 * @return  mixed  Null if missing info | stdClass if found
	 */
	protected function getGithubProfile()
	{
		$params = $this->getParams();

		$username = $params->get('github_user');
		$password = $params->get('github_password');
		$member = $params->get('github_member');

		if (!$member)
		{
			$this->setError(JText::_('MOD_PHPROBERTO_GHCARD_ERROR_MISSING_PROFILE'));

			return null;
		}

		$table = $this->getTable();

		if ($table->load(array('username' => $member)))
		{
			return json_decode($table->profile);
		}

		$githubOptions = new JRegistry(
			array(
				'api' => array(
					'username' => $username,
					'password' => $password
				)
			)
		);

		try
		{
			$github = new JGithub($githubOptions);

			$profile = $github->users->getUser($member);
		}
		catch (Exception $e)
		{
			$this->setError(JText::sprintf('MOD_PHPROBERTO_GHCARD_ERROR_GITHUB_CONNECTION', $e->getMessage()));

			return null;
		}

		$tableData = array(
			'username' => $member,
			'profile' => (array) $profile
		);

		if (!$table->save($tableData))
		{
			$this->setError($table->getError());

			return null;
		}

		return $profile;
	}

	/**
	 * Render the module
	 *
	 * @param   array  $layoutData  Array containing the data to use in the layout
	 *
	 * @return  string
	 */
	public function render($layoutData = array())
	{
		$layoutData = array_merge($this->getBaseLayoutData(), $layoutData);

		if (empty($layoutData['profile']))
		{
			$this->setLayout('_error');
		}

		return parent::render($layoutData);
	}

	/**
	 * Get database table
	 *
	 * @param   string  $name  Instance name of the table to load
	 *
	 * @return  JTable
	 */
	protected function getTable($name = 'Ghcard')
	{
		return JTable::getInstance($name, 'PhprobertoTable', array());
	}
}
